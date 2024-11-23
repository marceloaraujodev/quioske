export default function contactUs(){
  const phoneNumber = "5547992009823"; // Add the recipient's phone number here
  const message = "Olá tudo bem? A Quioske agradeçe o seu contato, como podemos te ajudar?"; // Customize your message here
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  
  window.open(url, "_blank");
}

