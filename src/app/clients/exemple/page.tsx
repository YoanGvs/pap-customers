import { redirect } from "next/navigation";

export default function CustomerExample() {
  // L'ancien lien d'aperçu reste utilisable après l'ajout des fiches individuelles.
  redirect("/clients/9");
}
