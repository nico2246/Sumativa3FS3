import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class LocalStorageUtils {
  private platformId = inject(PLATFORM_ID);

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  set<T>(key: string, value: T): void {
    if (!this.isBrowser()) return;
    localStorage.setItem(key, JSON.stringify(value));
  }

  get<T>(key: string): T | null {
    if (!this.isBrowser()) return null;
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  }

  remove(key: string): void {
    if (!this.isBrowser()) return;
    localStorage.removeItem(key);
  }

  clear(): void {
    if (!this.isBrowser()) return;
    localStorage.clear();
  }
}
