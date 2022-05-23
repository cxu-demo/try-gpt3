export async function onRequestPost(request) {
    const { headers } = request;
    const contentType = headers.get('content-type') || '';

    if (contentType.includes('form')) {
        const formData = await request.formData();
        var data = {
            "max_tokens": 5};
        formData.forEach((value, key) => data[key] = value);
    } else if (contentType.includes('json')) {
        const data = await request.json();
    } else {
        return new Response('Invalid request', { status: 400 });
    }

    const APIresponse = await fetch("https://api.openai.com/v1/engines/text-ada-001/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.OPENAI_SECRET}`,
        },
        body: JSON.stringify(data),
       });
    const result = await APIresponse.json();
    result.prompt = data.prompt;
    result.localtime = new Date().toLocaleString();
    return new Response(JSON.stringify(result));
}