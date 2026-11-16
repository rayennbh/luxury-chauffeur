import { useState } from "react";
import { MessageCircle, X, ArrowUpRight, LogOut, Send } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useDisclosure } from "@/hooks/use-disclosure";
import { useFormSubmission } from "@/hooks/use-form-submission";
import { usePocketbaseRecords } from "@/hooks/use-pocketbase-records";
import { pocketbaseClient } from "@/lib/pocketbase-client";
import { whatsappUrl } from "@/lib/contact-links";
import { WHATSAPP_NUMBER, WHATSAPP_DEFAULT_MESSAGE } from "@/constants/site";
import type { RecordModel } from "pocketbase";

type Message = RecordModel & { body: string; sender: string };
function Conversation({ owner }: { owner: string }) {
  const messages = usePocketbaseRecords<Message>("prime_messages", {
    sort: "created",
    realtime: true,
  });
  const form = useFormSubmission({
    submit: (_values, data) =>
      messages.create({
        owner,
        sender: "visiteur",
        body: String(data.get("body")).trim(),
      }),
  });
  return (
    <>
      <div className="chat-messages" aria-live="polite">
        {messages.isLoading ? (
          <p>Loading conversation…</p>
        ) : messages.error ? (
          <div>
            <p>Unable to load messages.</p>
            <button
              className="text-link"
              onClick={() => void messages.reload()}
            >
              Try again
            </button>
          </div>
        ) : messages.records.length === 0 ? (
          <div className="chat-welcome">
            <MessageCircle size={28} />
            <p>
              Hello and welcome!
              <br />
              How can we help you?
            </p>
            <small>
              Leave a message and our team will reply here when available.
            </small>
          </div>
        ) : (
          messages.records.map((message) => (
            <div
              key={message.id}
              className={`chat-bubble ${message.sender === "visiteur" ? "visitor" : ""}`}
            >
              <small>{message.sender === "visiteur" ? "You" : "LUXRIDE"}</small>
              <p>{message.body}</p>
            </div>
          ))
        )}
      </div>
      <form onSubmit={form.onSubmit} className="chat-compose">
        <input {...form.honeypotProps} />
        <label className="sr-only" htmlFor="chat-body">
          Your message
        </label>
        <input
          id="chat-body"
          name="body"
          placeholder="Type your message…"
          required
          maxLength={2000}
        />
        <button
          disabled={form.isSubmitting}
          className="icon-button"
          aria-label="Send message"
        >
          <Send size={19} />
        </button>
        {form.isError && (
          <p role="alert" className="form-error">
            Message not sent. Please try again.
          </p>
        )}
        {form.isSuccess && (
          <p className="chat-sent" role="status">
            Message received. Waiting for a reply from our team.
          </p>
        )}
      </form>
    </>
  );
}

export function LiveChat() {
  const panel = useDisclosure();
  const auth = useAuth();
  const [signup, setSignup] = useState(false);
  const [passwordReset, setPasswordReset] = useState(false);
  const authForm = useFormSubmission({
    submit: (values) =>
      passwordReset
        ? pocketbaseClient
            .collection("users")
            .requestPasswordReset(String(values.email))
        : signup
          ? auth.signup(String(values.email), String(values.password))
          : auth.login(String(values.email), String(values.password)),
  });
  return (
    <div className="live-chat">
      <button
        id="chat-trigger"
        className="chat-trigger"
        {...panel.triggerProps}
        aria-label={panel.isOpen ? "Close chat" : "Open chat"}
      >
        {panel.isOpen ? <X size={22} /> : <MessageCircle size={22} />}
        <span>Let us plan your journey</span>
      </button>
      {panel.isOpen && (
        <section
          {...panel.panelProps}
          className="chat-panel"
          aria-label="LUXRIDE private chat"
        >
          <header>
            <div>
              <strong>Let us talk about your journey.</strong>
              <small>LUXRIDE</small>
            </div>
            <button
              className="icon-button"
              onClick={panel.close}
              aria-label="Close chat"
            >
              <X size={20} />
            </button>
          </header>
          {auth.isLoading ? (
            <p className="chat-auth">Loading…</p>
          ) : auth.isAuthed && auth.user ? (
            <>
              <div className="chat-account">
                <span>Your private conversation</span>
                <button onClick={auth.logout} aria-label="Sign out">
                  <LogOut size={16} />
                </button>
              </div>
              <Conversation owner={auth.user.id} />
            </>
          ) : (
            <div className="chat-auth">
              <h3>
                {passwordReset
                  ? "Reset your password"
                  : signup
                    ? "Create your account."
                    : "Welcome aboard."}
              </h3>
              <p>
                Sign in to chat with our team and view your messages. You can
                also use the contact form without an account.
              </p>
              {passwordReset && authForm.isSuccess ? (
                <p role="status">
                  If an account matches this email address, a password reset
                  link has been sent.
                </p>
              ) : (
                <form onSubmit={authForm.onSubmit}>
                  <input {...authForm.honeypotProps} />
                  <label htmlFor="chat-email">
                    E-mail
                    <input
                      id="chat-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                    />
                  </label>
                  {!passwordReset && (
                    <label htmlFor="chat-password">
                      Password
                      <input
                        id="chat-password"
                        name="password"
                        type="password"
                        minLength={8}
                        autoComplete={
                          signup ? "new-password" : "current-password"
                        }
                        required
                      />
                      <small>At least 8 characters.</small>
                    </label>
                  )}
                  {authForm.isError && (
                    <p className="form-error" role="alert">
                      {passwordReset
                        ? "Unable to send. Please try again."
                        : signup
                          ? "Unable to create an account. Check your email and password, or sign in if you already have an account."
                          : "Unable to sign in. Check your email and password."}
                    </p>
                  )}
                  <button
                    className="button button-blue"
                    disabled={authForm.isSubmitting}
                  >
                    {authForm.isSubmitting
                      ? "Please wait…"
                      : passwordReset
                        ? "Send reset link"
                        : signup
                          ? "Create account"
                          : "Sign in"}
                    <ArrowUpRight size={16} />
                  </button>
                </form>
              )}
              <button
                className="text-link"
                onClick={() => {
                  setSignup(!signup);
                  setPasswordReset(false);
                  authForm.reset();
                }}
              >
                {signup || passwordReset
                  ? "I already have an account"
                  : "Create an account"}
              </button>
              {!signup && !passwordReset && (
                <button
                  className="chat-reset"
                  onClick={() => {
                    setPasswordReset(true);
                    authForm.reset();
                  }}
                >
                  Forgot your password?
                </button>
              )}
              <a
                className="chat-whatsapp"
                href={whatsappUrl({
                  phone: WHATSAPP_NUMBER,
                  text: WHATSAPP_DEFAULT_MESSAGE,
                })}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle size={16} /> Continue on WhatsApp
              </a>
            </div>
          )}
        </section>
      )}
    </div>
  );
}