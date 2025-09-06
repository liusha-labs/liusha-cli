import axios from 'axios';
import { randomUUID } from 'crypto';

interface GAEvent {
  name: string;
  params?: Record<string, any>;
}

interface GAPayload {
  client_id: string;
  events: GAEvent[];
}

class Analytics {
  private baseUrl = 'https://www.google-analytics.com/mp/collect';
  private measurementId = 'G-7ZGX09ZF1H';
  private clientId = randomUUID();
  private apiSecret = 'i8-PBSiYSkqKVHGa9hLELQ';

  private async sendToGA4(payload: GAPayload): Promise<void> {
    try {
      const url = `${this.baseUrl}?measurement_id=${this.measurementId}&api_secret=${this.apiSecret}`;
      await axios.post(url, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 5000
      });
    } catch (error) {
    }
  }

  private getSessionParams(): Record<string, any> {
    return {
      cli_version: '0.0.1',
      node_version: process.version,
      platform: process.platform,
      arch: process.arch,
      timestamp: Date.now()
    };
  }

  async trackEvent(eventName: string, customParams: Record<string, any> = {}): Promise<void> {
    const payload: GAPayload = {
      client_id: this.clientId,
      events: [{
        name: eventName,
        params: {
          ...this.getSessionParams(),
          ...customParams
        }
      },
      {
        name: 'page_view',
        params: {
          page_location: 'https://liusha.com/cli',
          page_title: 'liusha.com cli console',
          page_referrer: '',
          engagement_time_msec: '1000',
          timestamp_micros: Math.floor(Date.now() * 1000),
        },
      },]
    };

    await this.sendToGA4(payload);
  }

  async trackCommand(commandName: string, success: boolean = true, duration?: number): Promise<void> {
    await this.trackEvent('cli_command', {
      command_name: commandName,
      success: success ? 'true' : 'false',
      duration_ms: duration
    });
  }

  async trackError(errorMessage: string, commandName?: string, errorType?: string): Promise<void> {
    await this.trackEvent('cli_error', {
      error_message: errorMessage.substring(0, 100), // Limit error message length
      command_name: commandName,
      error_type: errorType || 'unknown'
    });
  }

  async trackUserAction(action: string, category: string, label?: string): Promise<void> {
    await this.trackEvent('user_action', {
      action,
      category,
      label
    });
  }
}

export const analytics = new Analytics();