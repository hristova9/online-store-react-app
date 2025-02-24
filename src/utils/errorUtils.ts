export const handleError = (err: unknown): string => {
    if (err instanceof Error) {
      console.error('Error:', err.message);
      return err.message;
    } else {
      console.error('An unknown error occurred:', err);
      return 'An unknown error occurred';
    }
  };
  