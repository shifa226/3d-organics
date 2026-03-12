import { MessageCircle } from "lucide-react";
import { getWhatsAppLink } from "@/data/products";

export default function WhatsAppButton() {
  return (
    <a
      href={getWhatsAppLink("Hello! I'm interested in your herbal products.")}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="hidden sm:inline font-ui text-sm">Chat with us</span>
    </a>
  );
}
