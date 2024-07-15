import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

const NotConnected = () => {
  return (
    <Alert
      variant="destructive"
      className="flex items-center p-4 rounded-lg shadow-lg bg-red-50 border-l-4 border-red-500"
    >
      <ExclamationTriangleIcon className="h-6 w-6 text-red-500 mr-3" />
      <div>
        <AlertTitle className="font-bold text-red-700 text-lg">Warning</AlertTitle>
        <AlertDescription className="text-red-600">Please connect your Wallet to our DApp.</AlertDescription>
      </div>
    </Alert>
  );
};

export default NotConnected;
