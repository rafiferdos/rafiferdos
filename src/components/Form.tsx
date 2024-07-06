import { AiTwotoneMessage } from "react-icons/ai";
import { Button } from "./ui/moving-border";
import { BsSend } from "react-icons/bs";
import toast, { Toaster } from "react-hot-toast";
import { ThemeContext } from "@/providers/ThemeProvider";
import { useContext, useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const Form = () => {
  const { theme } = useContext(ThemeContext);

  const form = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState({
    from_name: "",
    from_email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSend = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    emailjs
      .sendForm("service_kc0mm9g", "template_iradfho", form.current!, {
        publicKey: "R0RWxr4SyoqE60P6J",
      })
      .then(
        () => {
          toast.success("Message sent successfully!", {
            style: {
              borderRadius: "9999px",
              backdropFilter: "blur(10px)",
              background:
                theme === "dark"
                  ? "rgba(0, 0, 0, 0.2)"
                  : "rgba(255, 255, 255, 0.2)",
              color: theme === "dark" ? "#fff" : "#000",
            },
          });
        },
        (error) => {
          toast.error("Failed to send message!", {
            style: {
              borderRadius: "9999px",
              backdropFilter: "blur(10px)",
              background:
                theme === "dark"
                  ? "rgba(0, 0, 0, 0.2)"
                  : "rgba(255, 255, 255, 0.2)",
              color: theme === "dark" ? "#fff" : "#000",
            },
          });
        }
      );
  };

  return (
    <form
      ref={form}
      onSubmit={handleSend}
      className="flex flex-col gap-4 px-4 py-12"
    >
      <label className="input input-bordered flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
        </svg>
        <input
          type="text"
          name="from_name"
          className="grow"
          placeholder="Your Name"
          value={formData.from_name}
          onChange={handleChange}
        />
      </label>
      <label className="input input-bordered flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
          <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
        </svg>
        <input
          type="email"
          name="from_email"
          className="grow"
          placeholder="Email"
          value={formData.from_email}
          onChange={handleChange}
        />
      </label>
      <textarea
        name="message"
        className="textarea"
        placeholder="Write your message"
        value={formData.message}
        onChange={handleChange}
      ></textarea>
      <div className="mx-auto">
        <Button type="submit" className="gap-2">
          Send
          <BsSend />
        </Button>
      </div>
      <Toaster />
    </form>
  );
};

export default Form;
