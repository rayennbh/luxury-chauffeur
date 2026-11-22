export type TransferQuestion = { question: string; answer: string };

type AirportTransferFaqProps = {
  airportName: string;
  destination: string;
  additionalQuestions: TransferQuestion[];
};

export function airportTransferQuestions({ airportName, destination, additionalQuestions }: AirportTransferFaqProps) {
  return [
    {
      question: `How much does a private transfer from ${airportName} to ${destination} cost?`,
      answer: "After you send your request, your chauffeur will discuss your trip with you and confirm the fare.",
    },
    {
      question: `Where will I meet my chauffeur at ${airportName}?`,
      answer: "Share your flight number and arrival time when you request a transfer. Your chauffeur will agree on a meeting point with you based on your arrival details.",
    },
    {
      question: "What if my flight is delayed?",
      answer: "If your flight is delayed, contact your chauffeur to discuss a new pickup time and confirm any waiting arrangements.",
    },
    {
      question: "How much luggage can I bring?",
      answer: "Tell us how many passengers and bags you’re travelling with, including any oversized items. Your chauffeur will confirm which vehicle suits your group and luggage.",
    },
    ...additionalQuestions,
  ];
}

export function AirportTransferFaq(props: AirportTransferFaqProps) {
  const questions = airportTransferQuestions(props);
  return (
    <section className="destination-section destination-soft">
      <div className="destination-container">
        <h2>Before you book</h2>
        {questions.map(({ question, answer }) => (
          <details className="destination-faq" key={question}>
            <summary>{question}</summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
