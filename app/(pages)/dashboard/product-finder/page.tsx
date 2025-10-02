"use client";

import { Filter, Grid3X3, Heart, List, Search, ShoppingCart, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useProductStore } from "@/lib/client/store";

const categories = [
  { id: "all", label: "All", icon: "🏪" },
  { id: "phones", label: "Phones", icon: "📱" },
  { id: "headsets", label: "Headsets", icon: "🎧" },
  { id: "laptops", label: "Laptops", icon: "💻" },
  { id: "tv", label: "TV sets", icon: "📺" },
  { id: "sound", label: "Sound", icon: "🔊" },
  { id: "watches", label: "Watches", icon: "⌚" },
  { id: "others", label: "Others", icon: "💡" },
  { id: "internet", label: "Internet", icon: "🌐" },
];

const brands = [
  { id: "apple", label: "Apple" },
  { id: "samsung", label: "Samsung" },
  { id: "huawei", label: "Huawei" },
  { id: "microsoft", label: "Microsoft" },
  { id: "sony", label: "Sony" },
  { id: "bose", label: "Bose" },
  { id: "dell", label: "Dell" },
  { id: "lg", label: "LG" },
  { id: "jbl", label: "JBL" },
  { id: "philips", label: "Philips" },
  { id: "tp-link", label: "TP-Link" },
];

const colors = [
  { id: "red", label: "Red", color: "bg-red-500" },
  { id: "orange", label: "Orange", color: "bg-orange-500" },
  { id: "blue", label: "Blue", color: "bg-blue-500" },
  { id: "black", label: "Black", color: "bg-black" },
  { id: "white", label: "White", color: "bg-white border" },
  { id: "purple", label: "Purple", color: "bg-purple-500" },
  { id: "gray", label: "Gray", color: "bg-gray-600" },
];

// Filter component for reuse in both desktop and mobile
function FilterSection() {
  const {
    priceRange,
    selectedBrands,
    selectedColors,
    deliveryDate,
    selectedCategory, // Added selectedCategory
    setPriceRange,
    toggleBrand,
    toggleColor,
    setDeliveryDate,
    setSelectedCategory, // Added setSelectedCategory
  } = useProductStore();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-3 font-semibold">Related categories</h3>
        <RadioGroup onValueChange={setSelectedCategory} value={selectedCategory}>
          <div className="space-y-2 text-sm">
            {categories.map((category) => (
              <div className="flex items-center space-x-2" key={category.id}>
                <RadioGroupItem id={`category-${category.id}`} value={category.id} />
                <Label className="cursor-pointer font-normal text-sm" htmlFor={`category-${category.id}`}>
                  {category.label}
                </Label>
              </div>
            ))}
          </div>
        </RadioGroup>
      </div>

      <Separator />

      {/* Brands */}
      <div>
        <h3 className="mb-3 font-semibold">Brands</h3>
        <div className="max-h-48 space-y-3 overflow-y-auto">
          {brands.map((brand) => (
            <div className="flex items-center space-x-2" key={brand.id}>
              <Checkbox checked={selectedBrands.includes(brand.id)} id={`brand-${brand.id}`} onCheckedChange={() => toggleBrand(brand.id)} />
              <Label className="cursor-pointer font-normal text-sm" htmlFor={`brand-${brand.id}`}>
                {brand.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Colors */}
      <div>
        <h3 className="mb-3 font-semibold">Colors</h3>
        <div className="grid grid-cols-1 gap-2">
          {colors.map((color) => (
            <div className="flex items-center space-x-2" key={color.id}>
              <Checkbox checked={selectedColors.includes(color.id)} id={`color-${color.id}`} onCheckedChange={() => toggleColor(color.id)} />
              <div className={`h-4 w-4 rounded ${color.color}`} />
              <Label className="cursor-pointer font-normal text-sm" htmlFor={`color-${color.id}`}>
                {color.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Delivery Date */}
      <div>
        <h3 className="mb-3 font-semibold">Delivery date</h3>
        <RadioGroup onValueChange={setDeliveryDate} value={deliveryDate}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem id="delivery-any" value="any" />
            <Label className="font-normal text-sm" htmlFor="delivery-any">
              Any day
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem id="delivery-today" value="today" />
            <Label className="font-normal text-sm" htmlFor="delivery-today">
              Today
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem id="delivery-tomorrow" value="tomorrow" />
            <Label className="font-normal text-sm" htmlFor="delivery-tomorrow">
              Tomorrow
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem id="delivery-week" value="week" />
            <Label className="font-normal text-sm" htmlFor="delivery-week">
              Within 7 days
            </Label>
          </div>
        </RadioGroup>
      </div>

      <Separator />

      {/* Price Range */}
      <div>
        <h3 className="mb-3 font-semibold">Price</h3>
        <div className="space-y-4">
          <Slider className="w-full" max={3000} onValueChange={setPriceRange} step={10} value={priceRange} />
          <div className="flex items-center space-x-2">
            <div className="flex-1">
              <Label className="text-muted-foreground text-xs" htmlFor="price-from">
                From
              </Label>
              <Input
                className="h-8"
                id="price-from"
                onChange={(e) => setPriceRange([Number.parseInt(e.target.value, 10) || 0, priceRange[1]])}
                type="number"
                value={priceRange[0]}
              />
            </div>
            <div className="flex-1">
              <Label className="text-muted-foreground text-xs" htmlFor="price-to">
                To
              </Label>
              <Input
                className="h-8"
                id="price-to"
                onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value, 10) || 3000])}
                type="number"
                value={priceRange[1]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductList() {
  const { filteredProducts, selectedCategory, searchQuery, viewMode, setSelectedCategory, setSearchQuery, setViewMode, applyFilters } = useProductStore();

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Apply initial filters on mount
  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  return (
    <div className="px-4 py-4 sm:py-6">
      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Desktop Filters Sidebar */}
        <aside className="hidden w-64 lg:block">
          <FilterSection />
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {/* Controls Bar */}
          <div className="mb-4 flex flex-col gap-4 sm:mb-6">
            {/* Top row - Mobile filter button and product count */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Mobile Filter Button */}
                <Sheet onOpenChange={setMobileFiltersOpen} open={mobileFiltersOpen}>
                  <SheetTrigger asChild>
                    <Button className="bg-transparent lg:hidden" size="sm" variant="outline">
                      <Filter className="mr-2 h-4 w-4" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent className="w-80 sm:w-96" side="left">
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                    </SheetHeader>
                    <ScrollArea className="h-full pr-4">
                      <div className="py-4">
                        <FilterSection />
                      </div>
                    </ScrollArea>
                  </SheetContent>
                </Sheet>

                <div className="flex items-center gap-2 text-muted-foreground text-sm">{filteredProducts.length} products</div>
              </div>

              {/* View Toggle - Desktop only */}
              <div className="hidden sm:block">
                <ToggleGroup onValueChange={setViewMode} type="single" value={viewMode}>
                  <ToggleGroupItem aria-label="Grid view" value="grid">
                    <Grid3X3 className="h-4 w-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem aria-label="List view" value="list">
                    <List className="h-4 w-4" />
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
            </div>

            {/* Bottom row - Search */}
            <div className="flex items-center gap-4">
              <div className="relative flex-1 sm:flex-initial">
                <Search className="-translate-y-1/2 absolute top-1/2 left-3 h-4 w-4 transform text-muted-foreground" />
                <Input className="w-full pl-10 sm:w-64" onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search products..." value={searchQuery} />
              </div>

              {/* View Toggle - Mobile */}
              <div className="sm:hidden">
                <ToggleGroup onValueChange={setViewMode} type="single" value={viewMode}>
                  <ToggleGroupItem aria-label="Grid view" size="sm" value="grid">
                    <Grid3X3 className="h-4 w-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem aria-label="List view" size="sm" value="list">
                    <List className="h-4 w-4" />
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-lg text-muted-foreground">No products found matching your filters.</p>
              <p className="mt-2 text-muted-foreground text-sm">Try adjusting your search criteria.</p>
            </div>
          ) : (
            <div
              className={`grid gap-4 sm:gap-6 ${
                viewMode === "grid" ? "grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
              }`}
            >
              {filteredProducts.map((product: any) => (
                <Card className="group transition-shadow hover:shadow-lg" key={product.id}>
                  <CardContent className="p-3 sm:p-4">
                    <div className="relative mb-3 sm:mb-4">
                      <img alt={product.title} className="h-40 w-full rounded-md object-cover sm:h-48" src={product.image || "/placeholder.svg"} />
                      {product.isNew && <Badge className="absolute top-2 left-2 bg-red-500 text-xs hover:bg-red-600">New</Badge>}
                      <Button className="absolute top-2 right-2 h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100" size="icon" variant="ghost">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <h3 className="line-clamp-2 font-medium text-sm leading-tight">{product.title}</h3>

                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-bold text-base text-blue-600 sm:text-lg">${product.price.toFixed(2)}</span>
                        {product.originalPrice && (
                          <>
                            <span className="text-muted-foreground text-xs line-through sm:text-sm">${product.originalPrice.toFixed(2)}</span>
                            <Badge className="text-xs" variant="destructive">
                              -{product.discount}%
                            </Badge>
                          </>
                        )}
                      </div>

                      <div className="flex items-center gap-1">
                        <div className="flex items-center">
                          {[...new Array(5)].map((_, i) => (
                            <Star className={`h-3 w-3 ${i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} key={i} />
                          ))}
                        </div>
                        <span className="text-muted-foreground text-xs">{product.rating}</span>
                      </div>

                      <p className="text-muted-foreground text-xs">{product.orders} orders this week</p>

                      <p className="text-muted-foreground text-xs">Seller: {product.seller}</p>

                      <div className="text-muted-foreground text-xs">
                        Delivery: {product.deliveryDays === 0 ? "Today" : product.deliveryDays === 1 ? "Tomorrow" : `${product.deliveryDays} days`}
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button className="flex-1" size="sm">
                          <ShoppingCart className="mr-1 h-4 w-4 sm:mr-2" />
                          <span className="xs:inline hidden">Add to cart</span>
                          <span className="xs:hidden">Add</span>
                        </Button>
                        <Button className="bg-transparent px-2 sm:px-3" size="sm" variant="outline">
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
