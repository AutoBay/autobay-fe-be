import { ChevronLeft, ChevronRight, Minus, Plus, Share2, ShoppingBagIcon, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";

export default function ProductDetailPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-8">
      <div className="flex items-start justify-between">
        <div className="grid gap-2">
          <div className="text-gray-500 text-sm">Jacket</div>
          <h1 className="font-bold text-3xl">Stonewind Trekker</h1>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
              <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
              <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
              <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
              <Star className="h-4 w-4 fill-gray-300 text-gray-300" />
            </div>
            <span className="text-gray-500 text-sm">4.9</span>
          </div>
        </div>
        <Button className="rounded-full" size="icon" variant="ghost">
          <Share2 className="h-5 w-5" />
          <span className="sr-only">Share</span>
        </Button>
      </div>
      <Separator />
      <div className="grid items-start gap-8 md:grid-cols-2 lg:gap-12">
        {/* Image Gallery Section */}
        <div className="grid gap-4 md:grid-cols-[100px_1fr] lg:grid-cols-[120px_1fr]">
          {/* Thumbnail Images */}
          <div className="hidden flex-col gap-4 md:flex">
            <button className="overflow-hidden rounded-lg border transition-colors hover:border-gray-900 dark:hover:border-gray-50">
              <img alt="Product thumbnail 1" className="aspect-4/3 object-cover" src="https://placehold.co/600x400?text=01" />
              <span className="sr-only">View Image 1</span>
            </button>
            <button className="overflow-hidden rounded-lg border transition-colors hover:border-gray-900 dark:hover:border-gray-50">
              <img alt="Product thumbnail 2" className="aspect-4/3 object-cover" src="https://placehold.co/600x400?text=02" />
              <span className="sr-only">View Image 2</span>
            </button>
            <button className="overflow-hidden rounded-lg border transition-colors hover:border-gray-900 dark:hover:border-gray-50">
              <img alt="Product thumbnail 3" className="aspect-4/3 object-cover" src="https://placehold.co/600x400?text=03" />
              <span className="sr-only">View Image 3</span>
            </button>
            <button className="overflow-hidden rounded-lg border transition-colors hover:border-gray-900 dark:hover:border-gray-50">
              <img alt="Product thumbnail 4" className="aspect-4/3 object-cover" src="https://placehold.co/600x400?text=04" />
              <span className="sr-only">View Image 4</span>
            </button>
          </div>
          {/* Main Product Image */}
          <div className="relative">
            <img
              alt="Stonewind Trekker Jacket"
              className="aspect-4/3 h-[410px] w-full rounded-lg border object-cover"
              src="https://placehold.co/600x400?text=01"
            />
            <div className="absolute top-4 left-4 rounded-full bg-red-500 px-3 py-1 font-medium text-white text-xs">New Arrival</div>
            <Button className="-translate-y-1/2 absolute top-1/2 left-4 rounded-full bg-white/80 hover:bg-white" size="icon" variant="ghost">
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Previous image</span>
            </Button>
            <Button className="-translate-y-1/2 absolute top-1/2 right-4 rounded-full bg-white/80 hover:bg-white" size="icon" variant="ghost">
              <ChevronRight className="h-5 w-5" />
              <span className="sr-only">Next image</span>
            </Button>
          </div>
        </div>

        {/* Product Details Section */}
        <div className="grid gap-6">
          <div className="flex items-baseline gap-2">
            <span className="font-bold text-3xl">$99.29</span>
            <span className="text-gray-500 text-lg line-through">$102.97</span>
          </div>
          <div className="text-gray-500 text-sm">498 products sold out</div>

          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label className="font-medium text-base" htmlFor="color">
                Color (Ocean Blue)
              </Label>
              <RadioGroup className="flex items-center gap-3" defaultValue="ocean-blue" id="color">
                <Label
                  className="relative cursor-pointer rounded-full border-2 border-transparent data-[state=checked]:border-gray-900"
                  htmlFor="color-ocean-blue"
                >
                  <RadioGroupItem className="sr-only" id="color-ocean-blue" value="ocean-blue" />
                  <img alt="Ocean Blue color" className="aspect-square w-20 rounded-md object-cover" src="https://placehold.co/600x400?text=01" />
                  <span className="sr-only">Ocean Blue</span>
                </Label>
                <Label className="relative cursor-pointer rounded-full border-2 border-transparent data-[state=checked]:border-gray-900" htmlFor="color-black">
                  <RadioGroupItem className="sr-only" id="color-black" value="black" />
                  <img alt="Black color" className="aspect-square w-20 rounded-md object-cover" src="https://placehold.co/600x400?text=02" />
                  <span className="sr-only">Black</span>
                </Label>
              </RadioGroup>
            </div>

            <div className="grid gap-2">
              <Label className="font-medium text-base" htmlFor="size">
                Size
                <a className="ml-2 text-gray-500 text-sm hover:underline" href="#">
                  Size Guide
                </a>
              </Label>
              <RadioGroup className="flex items-center gap-2" defaultValue="m" id="size">
                <Label
                  className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 bg-white font-medium text-sm ring-offset-white hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 data-[state=checked]:bg-gray-900 data-[state=checked]:text-gray-50 dark:border-gray-800 dark:bg-gray-950 dark:ring-offset-gray-950 dark:data-[state=checked]:bg-gray-50 dark:data-[state=checked]:text-gray-900 dark:focus-visible:ring-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-50"
                  htmlFor="size-s"
                >
                  <RadioGroupItem className="sr-only" id="size-s" value="s" />S
                </Label>
                <Label
                  className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 bg-white font-medium text-sm ring-offset-white hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 data-[state=checked]:bg-gray-900 data-[state=checked]:text-gray-50 dark:border-gray-800 dark:bg-gray-950 dark:ring-offset-gray-950 dark:data-[state=checked]:bg-gray-50 dark:data-[state=checked]:text-gray-900 dark:focus-visible:ring-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-50"
                  htmlFor="size-m"
                >
                  <RadioGroupItem className="sr-only" id="size-m" value="m" />M
                </Label>
                <Label
                  className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 bg-white font-medium text-sm ring-offset-white hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 data-[state=checked]:bg-gray-900 data-[state=checked]:text-gray-50 dark:border-gray-800 dark:bg-gray-950 dark:ring-offset-gray-950 dark:data-[state=checked]:bg-gray-50 dark:data-[state=checked]:text-gray-900 dark:focus-visible:ring-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-50"
                  htmlFor="size-l"
                >
                  <RadioGroupItem className="sr-only" id="size-l" value="l" />L
                </Label>
                <Label
                  className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 bg-white font-medium text-sm ring-offset-white hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 data-[state=checked]:bg-gray-900 data-[state=checked]:text-gray-50 dark:border-gray-800 dark:bg-gray-950 dark:ring-offset-gray-950 dark:data-[state=checked]:bg-gray-50 dark:data-[state=checked]:text-gray-900 dark:focus-visible:ring-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-50"
                  htmlFor="size-xl"
                >
                  <RadioGroupItem className="sr-only" id="size-xl" value="xl" />
                  XL
                </Label>
                <Label
                  className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 bg-white font-medium text-sm ring-offset-white hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 data-[state=checked]:bg-gray-900 data-[state=checked]:text-gray-50 dark:border-gray-800 dark:bg-gray-950 dark:ring-offset-gray-950 dark:data-[state=checked]:bg-gray-50 dark:data-[state=checked]:text-gray-900 dark:focus-visible:ring-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-50"
                  htmlFor="size-2xl"
                >
                  <RadioGroupItem className="sr-only" id="size-2xl" value="2xl" />
                  2XL
                </Label>
              </RadioGroup>
            </div>

            <div className="grid gap-2">
              <Label className="font-medium text-base" htmlFor="composition">
                Composition
              </Label>
              <p className="text-gray-500 text-sm">Premium Fabric Blend: 70% Merino Wool & 30% Acrylic</p>
            </div>

            <div className="grid gap-2">
              <Label className="font-medium text-base" htmlFor="quantity">
                Quantity
              </Label>
              <div className="flex items-center gap-2">
                <Button className="h-8 w-8 bg-transparent" size="icon" variant="outline">
                  <Minus className="h-4 w-4" />
                  <span className="sr-only">Decrease quantity</span>
                </Button>
                <div className="flex h-8 w-12 items-center justify-center rounded-md border border-gray-200 bg-white font-medium text-sm dark:border-gray-800 dark:bg-gray-950">
                  1
                </div>
                <Button className="h-8 w-8 bg-transparent" size="icon" variant="outline">
                  <Plus className="h-4 w-4" />
                  <span className="sr-only">Increase quantity</span>
                </Button>
              </div>
            </div>

            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button className="h-12 flex-1 text-lg">
                <ShoppingBagIcon />
                Add to Cart
              </Button>
              <Button className="h-12 flex-1 bg-[#D9FF66] text-gray-900 text-lg hover:bg-[#c6eb5e]">Buy Now</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
