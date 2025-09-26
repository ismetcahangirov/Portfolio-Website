import { TypingText } from "@/components/ui/typing-text";
export default function TypingAnimation({ arr, className }) {
  return (
    <div className="flex items-center justify-center">
      <TypingText
        texts={arr}
        className={`${className}`}
        speed={110}
        loop={true}
        pauseDuration={1800}
        showCursor={true}
        cursor="_"
        cursorClassName="font-bold text-white"
      />
    </div>
  );
}
