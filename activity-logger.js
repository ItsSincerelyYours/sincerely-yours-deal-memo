// Simple Activity Logger using Webhook
// This can send login data to various services like Zapier, Make.com, or a custom endpoint

class ActivityLogger {
    constructor(webhookUrl) {
        this.webhookUrl = webhookUrl;
    }

    async logActivity(eventData) {
        try {
            // Get additional info
            const ipAddress = await this.getIPAddress();
            const userAgent = navigator.userAgent;
            const timestamp = new Date().toISOString();
            
            // Prepare log data
            const logData = {
                timestamp: timestamp,
                email: eventData.email,
                name: eventData.name || 'Unknown',
                app: eventData.app || 'Deal Memo Generator',
                status: eventData.status || 'Unknown',
                ipAddress: ipAddress,
                userAgent: userAgent,
                location: window.location.href
            };
            
            // Send to webhook
            if (this.webhookUrl && this.webhookUrl !== 'YOUR_WEBHOOK_URL_HERE') {
                const response = await fetch(this.webhookUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(logData)
                });
                
                if (response.ok) {
                    console.log('Activity logged successfully');
                } else {
                    console.error('Failed to log activity');
                }
            } else {
                // Fallback: Log to console
                console.log('Activity Log:', logData);
                
                // Alternative: Store in localStorage for later retrieval
                this.storeLocally(logData);
            }
        } catch (error) {
            console.error('Error logging activity:', error);
        }
    }
    
    async getIPAddress() {
        try {
            const response = await fetch('https://api.ipify.org?format=json');
            const data = await response.json();
            return data.ip;
        } catch (error) {
            return 'Unknown';
        }
    }
    
    storeLocally(logData) {
        // Store in localStorage as a backup
        const logs = JSON.parse(localStorage.getItem('activityLogs') || '[]');
        logs.push(logData);
        
        // Keep only last 100 logs
        if (logs.length > 100) {
            logs.shift();
        }
        
        localStorage.setItem('activityLogs', JSON.stringify(logs));
    }
    
    // Retrieve stored logs (useful for debugging)
    getStoredLogs() {
        return JSON.parse(localStorage.getItem('activityLogs') || '[]');
    }
    
    // Export logs as CSV
    exportLogsAsCSV() {
        const logs = this.getStoredLogs();
        if (logs.length === 0) {
            console.log('No logs to export');
            return;
        }
        
        // Create CSV
        const headers = Object.keys(logs[0]);
        const csvContent = [
            headers.join(','),
            ...logs.map(log => 
                headers.map(header => 
                    JSON.stringify(log[header] || '')
                ).join(',')
            )
        ].join('\n');
        
        // Download CSV
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `activity-logs-${new Date().toISOString()}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
    }
}

// Usage Example:
// const logger = new ActivityLogger('YOUR_WEBHOOK_URL_HERE');
// logger.logActivity({
//     email: 'user@sincerely-yours.xyz',
//     name: 'John Doe',
//     app: 'US Deal Memo',
//     status: 'Login Success'
// });