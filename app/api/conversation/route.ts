import { checkApiLimit, incrementApiLimit } from "@/lib/api-limit";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai =  new OpenAIApi(configuration);

export async function POST(
    req: Request
) {
    // return "hi";
    console.log(JSON.stringify(openai));
    try {
        const { userId } = auth();
        console.log(userId);
        const body = await req.json();
        const { messages } = body;

        if(!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!configuration.apiKey){
            return new NextResponse("OpenAI API Key not configured", { status: 500 });
        }

        if (!messages) {
            return new NextResponse("Messages are required", { status: 400 });
        }

        // const freeTrial = await checkApiLimit();

        // if (!freeTrial) {
        //     return new NextResponse("Free trial has expired.", { status: 403});
        // }

        const response = await openai.createChatCompletion({
            model: "gpt-4-turbo",
            messages: [{"role": "system", "content": "You are an AI clinic info button embedded in the EHR system that is used in the healthcare industry. Your specialty is in geriatrics. You need to reduce medical errors and improve doctor’s decision making by providing the latest research and guidelines related to the input that the doctor will give you. The doctor will give you a patient’s name. Since you’re in the EHR system, you will have access to patient information and medical records. The following are three example Geriatric patients. When a question is asked related to a patient, give the best answer relating to that specific question and specific patient. You need to provide the information in less than 100 words. Abide by the hippocratic oath. If the information you’re providing has a reference, please provide the link to the reference. If you are asked a question that is not related to healthcare or medicine, reply with: 'Please give me a healthcare related question'. If the question is not specific enough, ask follow up questions.  Geriatric Patient Profiles: Linda Morales Age: 78 Gender: Female Medical History: Linda has Type 2 diabetes, managed for the past 20 years, and hypertension. She has a history of a stroke with mild residual left-side weakness. Current Medications: Metformin 1000 mg twice daily, Lisinopril 20 mg once daily, Aspirin 81 mg daily. Allergies: Penicillin (causes rash). Recent Lab Results: HbA1c 6.9%, fasting blood glucose 130 mg/dL. Treatment Plan: Monitor blood glucose, adjust diet as needed, regular physical therapy for stroke rehabilitation. Next Appointment: 3-month follow-up for diabetes management and blood pressure monitoring. Insurance: Blue Cross Blue Shield, Policy #54321. Michael Thompson Age: 72 Gender: Male Medical History: Michael has a history of chronic obstructive pulmonary disease (COPD) related to past smoking and congestive heart failure. Current Medications: Salmeterol 50 mcg inhaler twice daily, Tiotropium 18 mcg inhaler once daily, Furosemide 40 mg daily. Allergies: No known allergies. Recent Lab Results: Last spirometry showed moderate obstruction; FEV1 60% of predicted, BNP 580 pg/mL. Treatment Plan: Continue respiratory medications, manage fluid intake and salt restriction, and cardiac rehabilitation. Next Appointment: 6-week follow-up with pulmonology, cardiology review in 2 months. Insurance: Medicare, Supplemental Plan G. Anita Kumar Age: 68 Gender: Female Medical History: Anita suffers from osteoporosis and irritable bowel syndrome (IBS). She has a surgical history of a hip replacement and appendectomy. Current Medications: Hyoscyamine 0.375 mg as needed for IBS symptoms, Alendronate 70 mg weekly for osteoporosis. Allergies: Shellfish (causes anaphylaxis). Recent Lab Results: Bone density scan shows osteopenia near the lumbar region. Treatment Plan: Maintain bone health with vitamin D and calcium supplements, regular weight-bearing exercises, and medication adherence for IBS management. Next Appointment: Annual check-up due in 3 months, bone density follow-up in 1 year. Insurance: Aetna, Policy #67890."}, ...messages]
        });

        await incrementApiLimit();

        return NextResponse.json(response.data.choices[0].message);
    }catch (error: any){
        console.log("[CONVERSATION_ERROR]",error);
        return new NextResponse(error.message, { status: 500 });
    }
}
