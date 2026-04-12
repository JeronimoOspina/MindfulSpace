async function obtenerDatos() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    const data = await response.json();
    console.log(data);
    document.getElementById('resultado').innerText = JSON.stringify(data, null, 2);
  } catch (error) {
    console.error('Error:', error);
    document.getElementById('resultado').innerText = 'Error: ' + error.message;
  }
}