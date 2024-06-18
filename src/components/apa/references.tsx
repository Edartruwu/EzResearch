"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CopyIcon } from "@radix-ui/react-icons";

export default function ReferenceCard() {
  return (
    <Card className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
      <CardHeader className="bg-gray-900 dark:bg-gray-700 rounded-t-lg py-4 px-6">
        <CardTitle className="text-white font-bold text-xl">
          Tu Referencia
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-6 p-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-gray-700 dark:text-gray-300 font-semibold">
              Referencia en el texto
            </h3>
            <Button
              variant="outline"
              onClick={() => {
                navigator.clipboard.writeText(
                  "https://api.example.com/v1/data",
                );
              }}
            >
              <CopyIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </Button>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            https://api.example.com/v1/data
          </p>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-gray-700 dark:text-gray-300 font-semibold">
              Referencia global
            </h3>
            <Button
              variant="outline"
              onClick={() => {
                navigator.clipboard.writeText("abc123def456ghi789");
              }}
            >
              <CopyIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </Button>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            abc123def456ghi789
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
