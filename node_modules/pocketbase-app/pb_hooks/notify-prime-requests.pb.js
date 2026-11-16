/// <reference path="../pb_data/types.d.ts" />

// Notifies the team by email whenever a new transfer / appointment / contact
// request is submitted. The record is still stored in `prime_requests` as
// before — this only adds an email notification to contact@luxury-chauffeur.com.

onRecordAfterCreateSuccess((e) => {
  const r = e.record;

  const kind = r.get("kind") || "contact";
  const name = r.get("name") || "—";
  const email = r.get("email") || "—";
  const phone = r.get("phone") || "—";
  const departure = r.get("departure") || "—";
  const arrival = r.get("arrival") || "—";
  const date = r.get("requested_date") || "—";
  const time = r.get("requested_time") || "—";
  const passengers = r.get("passengers");
  const message = r.get("message") || "—";

  const kindLabel = {
    contact: "Demande de contact",
    transfert: "Demande de transfert",
    "rendez-vous": "Demande de rendez-vous",
  }[kind] || "Nouvelle demande";

  const message2 = new MailerMessage({
    from: { name: "Luxury Chauffeur — Site" },
    to: [{ address: "contact@luxury-chauffeur.com" }],
    subject: `${kindLabel} — ${name}`,
    html: `
      <h2>${kindLabel}</h2>
      <p><strong>Nom :</strong> ${name}</p>
      <p><strong>Email :</strong> ${email}</p>
      <p><strong>Téléphone :</strong> ${phone}</p>
      <p><strong>Type :</strong> ${kindLabel}</p>
      <p><strong>Départ :</strong> ${departure}</p>
      <p><strong>Arrivée :</strong> ${arrival}</p>
      <p><strong>Date souhaitée :</strong> ${date}</p>
      <p><strong>Heure souhaitée :</strong> ${time}</p>
      <p><strong>Passagers :</strong> ${passengers != null ? passengers : "—"}</p>
      <p><strong>Message :</strong><br>${message}</p>
      <hr>
      <p style="color:#888;font-size:11px;">Demande enregistrée dans PocketBase (collection prime_requests). Réponse à confirmer auprès du client.</p>
    `,
  });

  try {
    $app.newMailClient().send(message2);
  } catch (err) {
    $app.logger().error("prime_requests notification email failed", "err", String(err));
  }

  e.next();
}, "prime_requests");
