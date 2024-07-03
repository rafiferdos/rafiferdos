export function scrollToComponent(id: string) {
  // Check if running in a browser environment
  if (typeof window !== 'undefined') {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
}