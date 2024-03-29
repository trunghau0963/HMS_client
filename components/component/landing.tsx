/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/63POW0F92u3
 */
import Link from "next/link";
import { CardHeader, CardContent, Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Landing() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <PawPrintIcon className="h-6 w-6 mr-2" />
          <span>HMS</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
          <Button>
            <Link href="/sign-in">Get Started</Link>
          </Button>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Services
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Testimonials
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full pt-12 md:pt-24 lg:pt-32 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold">Welcome to HMS</h1>
          <p className="mt-4 text-lg sm:text-xl text-gray-600">Lorem Ipsum</p>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32" id="services">
          <div className="container space-y-12 px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center">
              Our Services
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="text-lg font-semibold">
                  Lorem Ipsum
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    &quot; Neque porro quisquam est qui dolorem ipsum quia dolor
                    sit amet, consectetur, adipisci velit...&quot; &quot; There
                    is no one who loves pain itself, who seeks after it and
                    wants to have it, simply because it is pain...&quot;
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="text-lg font-semibold">
                  Lorem Ipsum
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    &quot; Neque porro quisquam est qui dolorem ipsum quia dolor
                    sit amet, consectetur, adipisci velit...&quot; &quot; There
                    is no one who loves pain itself, who seeks after it and
                    wants to have it, simply because it is pain...&quot;
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="text-lg font-semibold">
                  Lorem Ipsum
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    &quot; Neque porro quisquam est qui dolorem ipsum quia dolor
                    sit amet, consectetur, adipisci velit...&quot; &quot; There
                    is no one who loves pain itself, who seeks after it and
                    wants to have it, simply because it is pain...&quot;
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-100"
          id="testimonials"
        >
          <div className="container space-y-12 px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center">
              Lorem Ipsum
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex items-center space-x-2">
                  <Avatar
                    alt="Customer 1"
                    src="/placeholder.svg?height=50&width=50"
                  />
                  <span className="text-lg font-semibold">John Doe</span>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">Lorem Ipsum</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex items-center space-x-2">
                  <Avatar
                    alt="Customer 2"
                    src="/placeholder.svg?height=50&width=50"
                  />
                  <span className="text-lg font-semibold">Jane Smith</span>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">Lorem Ipsum</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex items-center space-x-2">
                  <Avatar
                    alt="Customer 3"
                    src="/placeholder.svg?height=50&width=50"
                  />
                  <span className="text-lg font-semibold">Robert Johnson</span>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">Lorem Ipsum</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32" id="contact">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center">
              Lorem Ipsum
            </h2>
            <form className="mt-8 space-y-4">
              <Input className="w-full" placeholder="Your Name" type="text" />
              <Input className="w-full" placeholder="Your Email" type="email" />
              <textarea
                className="w-full h-32 p-2"
                placeholder="Additional Information"
              />
              <Button className="w-full" type="submit">
                Submit
              </Button>
            </form>
          </div>
        </section>
      </main>
      <footer className="flex justify-center items-center h-16 border-t">
        <p className="text-xs text-gray-500">© HMS</p>
      </footer>
    </div>
  );
}

function PawPrintIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="4" r="2" />
      <circle cx="18" cy="8" r="2" />
      <circle cx="20" cy="16" r="2" />
      <path d="M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z" />
    </svg>
  );
}
