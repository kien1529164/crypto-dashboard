import { API_CONFIG } from "@/config/api";

const WS_BASE = API_CONFIG.wsBase;

export class BinanceWebSocket {
  private ws: WebSocket | null = null;
  private retryDelay = 1000;
  private maxDelay = 30000;

  constructor(private stream: string, private onMessage: (data: any) => void) {}

  connect() {
    this.ws = new WebSocket(`${WS_BASE}/${this.stream}`);

    this.ws.onmessage = (e) => {
      try { this.onMessage(JSON.parse(e.data)); } catch {}
    };

    this.ws.onclose = () => {
      setTimeout(() => {
        this.retryDelay = Math.min(this.retryDelay * 2, this.maxDelay);
        this.connect();
      }, this.retryDelay);
    };

    this.ws.onopen = () => { this.retryDelay = 1000; };
  }

  close() { this.ws?.close(); }
}