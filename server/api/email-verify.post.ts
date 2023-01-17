import Message from "@/server/utils/Message";
import { sendOtpMail } from "@/server/utils/mail";
import { sendData } from "@/server/utils/ssrApi";

export default defineEventHandler(async e => {
    const body = await readBody(e)
    const path = '/api/email-verify/'

    if (body["req"] === 'send') {

        const data = await sendData(path, body)

        if (data.otp) {
            sendOtpMail(body['username'], body['email'], data.otp).then(r => { })
            e.node.res.end(JSON.stringify(Message.create("OTP is sent.", "success")))
        } else {
            e.node.res.end(JSON.stringify(Message.create("Unable to sent OTP.", "error")))
        }
    }
    else if (body["req"] === 'verify') {

        const data = await sendData(path, body)
            .catch(() => {
                e.node.res.end(JSON.stringify(Message.create("otp isn't valid.", "error")))
            })
        e.node.res.end(JSON.stringify(data))
    } else {
        e.node.res.end(JSON.stringify(Message.create("Missing/Insufficient fields", "error")))
    }
})
