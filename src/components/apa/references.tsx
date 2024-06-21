"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { CopyIcon } from "@radix-ui/react-icons";
import PropTypes from "prop-types";

interface ReferenceProps {
  title: string;
  reference: string;
}

export default function ReferenceCard({ title, reference }: ReferenceProps) {
  const { toast } = useToast();

  return (
    <Card className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
      <CardHeader className="bg-gray-900 dark:bg-gray-700 rounded-t-lg py-4 px-6">
        <CardTitle className="text-white font-bold text-xl">
          Citado desde: {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-6 p-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-gray-700 dark:text-gray-300 font-semibold">
              Referencia
            </h3>
            <Button
              variant="outline"
              onClick={() => {
                navigator.clipboard.writeText(reference),
                  toast({
                    title: "Tu Citación ha sido copiada correctamente",
                    description: "Suerte con tu investigación!",
                  });
              }}
            >
              <CopyIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </Button>
          </div>
          <p
            className="text-gray-600 dark:text-gray-400 text-sm"
            style={{ marginLeft: "2rem", textIndent: "-2rem" }}
          >
            {reference}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

// Prop type validation using PropTypes
ReferenceCard.propTypes = {
  title: PropTypes.string.isRequired,
  reference: PropTypes.string.isRequired,
};
