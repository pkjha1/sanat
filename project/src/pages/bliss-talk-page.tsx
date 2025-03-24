import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot as Lotus, MessageCircle, Sparkles } from 'lucide-react';
import { config } from '@/lib/config';

export function BlissTalkPage() {
  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Bliss Talk</h1>
          <p className="text-xl text-muted-foreground">
            Have a spiritual conversation with our AI guide
          </p>
        </div>

        {/* Introduction Card */}
        <Card className="bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lotus className="h-5 w-5 text-primary" />
              Welcome to Bliss Talk
            </CardTitle>
            <CardDescription>
              Engage in meaningful conversations about spirituality, philosophy, and ancient wisdom
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <MessageCircle className="h-4 w-4 text-primary" />
              </div>
              <p className="text-muted-foreground">
                Ask questions about Sanatan Dharma, explore spiritual concepts, or seek guidance on your spiritual journey.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Sparkles className="h-4 w-4 text-primary" />
              </div>
              <p className="text-muted-foreground">
                Our AI guide is trained on ancient texts and spiritual teachings to provide insightful responses.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Chat Widget */}
        <Card>
          <CardContent className="p-0">
            <elevenlabs-convai agent-id={config.convai.agentId}></elevenlabs-convai>
            <script src="https://elevenlabs.io/convai-widget/index.js" async type="text/javascript"></script>
          </CardContent>
        </Card>

        {/* Note */}
        <div className="text-center text-sm text-muted-foreground">
          <p>
            Note: This is an AI-powered conversation tool. While it strives to provide accurate information,
            please consult with qualified spiritual teachers for definitive guidance.
          </p>
        </div>
      </div>
    </div>
  );
}