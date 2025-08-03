import React, { Component, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error boundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    // Clear localStorage and reload
    try {
      localStorage.clear();
      window.location.reload();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      window.location.reload();
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <Card className="max-w-md w-full">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <AlertTriangle className="h-12 w-12 text-destructive" />
              </div>
              <CardTitle className="text-xl">Something went wrong</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-muted-foreground">
                The application encountered an error. This might be due to storage issues or corrupted data.
              </p>
              
              {this.state.error?.message.includes('quota') && (
                <p className="text-sm text-muted-foreground bg-muted p-3 rounded">
                  <strong>Storage Issue:</strong> Your browser's storage is full. Clicking "Reset & Reload" will clear the storage and fix this issue.
                </p>
              )}
              
              <div className="space-y-2">
                <Button 
                  onClick={this.handleReset}
                  className="w-full"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Reset & Reload
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={() => window.location.reload()}
                  className="w-full"
                >
                  Just Reload
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
