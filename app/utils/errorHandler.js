import { NextResponse } from 'next/server';

// used to create a new error
function createError(statusCode = 500, message) {
  return { message, statusCode, isOperational: true };
}

// unexpected error or created error can handle both
function handleError(error) {
  if (error.isOperational) {
    return NextResponse.json(
      {
        // json object message
        result: 'error',
        message: error.message,
      },
      // http status code
      { status: error.statusCode }
    );
  }

  console.log('Unexpected error:', error);
  return NextResponse.json({
    status: 'error',
    message: 'An unexpected error occurred',
  });
}

export { createError, handleError };
