
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const isVerifyPage = path === '/verifyemail';
    const isProtectedPage = path === '/' || path === '/profile';
    const token = request.cookies.get('token')?.value || '';

    // If not logged in, prevent access to protected pages
    if (isProtectedPage && !token) {
        return NextResponse.redirect(new URL('/login', request.nextUrl));
    }
    // Always allow login, signup, and verifyemail
    return NextResponse.next();
}

export const config = {
    matcher: [
        '/',
        '/profile',
        '/login',
        '/signup',
        '/verifyemail',
    ]
};