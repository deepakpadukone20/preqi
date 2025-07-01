import { useToast } from '@/hooks/use-toast';

export const useErrorHandler = () => {
  const { toast } = useToast();

  const handleError = (error: unknown, defaultMessage: string) => {
    console.error('Error occurred:', error);

    const errorMessage =
      error instanceof Error ? error.message : defaultMessage;

    toast({
      title: 'Error',
      description: errorMessage,
      variant: 'destructive',
    });
  };

  const handleSuccess = (message: string) => {
    toast({
      title: 'Success',
      description: message,
    });
  };

  return { handleError, handleSuccess };
};
