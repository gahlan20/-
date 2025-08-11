const scriptURL = "https://script.google.com/macros/s/AKfycbydRKKhXxTioosjIKqrsgURCDYGxBOgoipD3dtOQ1vj2CNeAVaxAcFYbj7lPPOIG_p8/exec"

let form = document.getElementById("form_contact");


form.addEventListener("submit" , (e) =>{
    e.preventDefault()

 fetch(scriptURL, {
    method: "POST",
    body: new FormData(form),
 })
 .then((Response) =>{
     setTimeout(() =>{
        localStorage.removeItem("cart")
        window.location.reload()
     },1000)
 })
 .catch((error) => console.error("eroor!" , error.message))
})