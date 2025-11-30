import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatPrice(price: number) {
  return (price / 100).toFixed(2);
}

export const convertFileSize = (size: number) => {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  let i = 0;
  while (size >= 1024 && i < sizes.length - 1) {
    size /= 1024;
    i++;
  }
  return `${size.toFixed(2)} ${sizes[i]}`;
};
