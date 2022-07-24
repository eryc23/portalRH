import { getSession } from 'next-auth/react';
import { NextRequest, NextResponse } from 'next/server';
import parseUrl from './utils/parseUrl';

async function handle(req: NextRequest, res: NextResponse) {
  const signInPage = "/login";
  const errorPage = "/login";
  const basePath = parseUrl(process.env.NEXTAUTH_URL).path;

  if(req.nextUrl.pathname.startsWith(basePath) || [signInPage, errorPage].includes(req.nextUrl.pathname)) return;
  
  const requestForNextAuth: any = {
    headers: {
      cookie: req.headers.get("cookie"),
    },
  }
  
  const session = await getSession({req: requestForNextAuth});
  
  if(session) return NextResponse.next();

  const signInUrl = req.nextUrl.clone();
  signInUrl.pathname = signInPage;

  return NextResponse.redirect(signInUrl);
}

export default handle;

export const config = { matcher: ["/", "/badge", "/paycheck", "/helpdesk"] }