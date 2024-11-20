export default function contactUs(){
  const phoneNumber = "5511915818881"; // Add the recipient's phone number here
  const message = "Olá tudo bem? Como podemos te ajudar?"; // Customize your message here
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  
  window.open(url, "_blank");
}

