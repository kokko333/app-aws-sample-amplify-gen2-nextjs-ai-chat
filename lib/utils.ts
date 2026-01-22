import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Tailwind CSSクラスをマージするユーティリティ関数
 * 競合するクラスを自動解決し、条件付きクラスをサポート
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
