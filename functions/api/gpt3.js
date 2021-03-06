export async function onRequestPost(context) {
    try {
        const { request ,env } = context;
        const { headers } = request;
        const contentType = headers.get('content-type') || '';

        if (contentType.includes('form')) {
            const formData = await request.formData();
            formData.forEach((value, key) => data[key] = value);
        } else if (contentType.includes('json')) {
            var data = await request.json();
        } else {
            return new Response('Invalid request', { status: 400 });
        }


        const APIresponse = await fetch("https://api.openai.com/v1/engines/text-ada-001/completions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${env.OPENAI_SECRET}`,
            },
            body: JSON.stringify(data),
           });
        const result = await APIresponse.json();
        result.prompt = data.prompt;
        result.timestamp = new Date();
        return new Response(JSON.stringify(result));
    } catch (error) {
        return new Response(error.stack, { status: 500 });
    }

}