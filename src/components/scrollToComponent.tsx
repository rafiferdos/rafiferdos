"use client";

export function scrollToComponent(id: string) {
  const element = document.getElementById(id);
  if (element) {
    setTimeout(() => {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 300); // 1 second delay
  }
}
