<script>
  const site = {"title": "Try GPT3"};
  const results = [];
  async function submitForm(e) {
    const formData = new FormData(e.target);
    const data = {
      "max_tokens":5
    };
    formData.forEach((value, key) => data[key] = value);
    const response = await fetch("/api/gpt3", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    results.unshift(result);
    results = results;

    console.log(results.length, result);
    // document.querySelector(".result-content details").open = true;
    return result;
  }
  let ifDetailsOpen = (index) => index ==1 ? "yes" : null;
</script>

<svelte:head>
	<title>{site.title}</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/water.css@2/out/water.css">

  <meta property="og:title" content="PLay with GPT-3 AI">
  <meta property="og:type" content="website">
  <meta property="og:description" content="Try GPT-3 here.">
</svelte:head>


<main>
  <h1>PLay with GPT-3 AI</h1>
  <form on:submit|preventDefault={submitForm}>
    <label for="prompt">Complete your unfinished sentence:</label>
    <textarea name="prompt" id="prompt" placeholder="Say this is a test..."></textarea>
    <input type="submit" value="Submit">
    <input type="reset" value="Reset">
  </form>

<h2> Results </h2>
<div class="result-section">
  <!-- render list-alike -->
  {#each results as result, index}
    <div class="result-content">
    <details open={ifDetailsOpen(index)}>
      <summary>"{result.prompt.slice(0,50)} ..." <br>at {result.timestamp.toLocaleString()} using {result.model}</summary>
      <p>{result.choices[0].text}</p>
    </details>
    </div>
  {/each}
  </div>
  
</main>