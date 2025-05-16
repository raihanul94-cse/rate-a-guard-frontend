import { Metadata } from 'next';
import { Globe, Mail, Phone, Star, Info, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { HomeNavbar } from '@/components/home/home-navbar';

export const metadata: Metadata = {
    title: 'Best in Online Marketplace | Compare Top Companies',
    description:
        'Compare the best companies in the online marketplace category. Read reviews, check ratings, and make informed decisions.',
};

const companies = [
    {
        id: 1,
        name: 'Vecteezy',
        domain: 'vecteezy.com',
        logo: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=100',
        rating: 4.9,
        reviews: 33512,
        location: 'Bowling Green, United States',
        categories: [
            'Video Production Service',
            'Photo Agency',
            'Online Marketplace',
            'Photography Service',
            'Design Studio',
        ],
    },
    {
        id: 2,
        name: 'Choice Mutual',
        domain: 'choicemutual.com',
        logo: 'https://images.pexels.com/photos/5473955/pexels-photo-5473955.jpeg?auto=compress&cs=tinysrgb&w=100',
        rating: 4.9,
        reviews: 1533,
        location: 'Reno, United States',
        categories: [
            'Insurance Agency',
            'Insurance Broker',
            'Online Marketplace',
            'Life Insurance Agency',
            'Term Life Insurance',
        ],
    },
    {
        id: 3,
        name: 'Overpass',
        domain: 'www.overpass.com',
        logo: 'https://images.pexels.com/photos/5473950/pexels-photo-5473950.jpeg?auto=compress&cs=tinysrgb&w=100',
        rating: 4.9,
        reviews: 1441,
        location: 'Newark, United States',
        categories: ['Online Marketplace', 'Recruitment Agency', 'Sales Solutions'],
    },
];

const categories = [
    { name: 'Bazar', count: 5 },
    { name: 'Christmas Market', count: 11 },
    { name: 'Clothes Market', count: 75 },
    { name: 'Coupon Service', count: 432 },
];

export default function MarketplacePage() {
    return (
        <div className="relative flex min-h-screen flex-col">
            <HomeNavbar />
            <main className="flex-1">
                <div className="min-h-screen bg-background">
                    <div className="container mx-auto py-8">
                        <div className="space-y-8">
                            <div className="text-center space-y-2">
                                <h1 className="text-4xl font-bold">Best in Online Marketplace</h1>
                                <p className="text-muted-foreground">
                                    Compare the best companies in this category <Info className="inline h-4 w-4" />
                                </p>
                            </div>

                            <div className="grid gap-8 lg:grid-cols-[300px,1fr]">
                                {/* Filters */}
                                <div className="space-y-6">
                                    <div className="space-y-4">
                                        <h2 className="font-semibold">Rating</h2>
                                        <div className="flex gap-2">
                                            <Button variant="outline" className="bg-blue-50">
                                                Any
                                            </Button>
                                            <Button variant="outline">
                                                <Star className="mr-1 h-4 w-4" fill="currentColor" />
                                                3.0+
                                            </Button>
                                            <Button variant="outline">
                                                <Star className="mr-1 h-4 w-4" fill="currentColor" />
                                                4.0+
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h2 className="font-semibold">Location</h2>
                                        <Select defaultValue="us">
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select location" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="us">United States</SelectItem>
                                                <SelectItem value="uk">United Kingdom</SelectItem>
                                                <SelectItem value="ca">Canada</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <Input placeholder="City or ZIP code" />
                                    </div>

                                    <div className="space-y-4">
                                        <h2 className="font-semibold">Company status</h2>
                                        <div className="flex items-center space-x-2">
                                            <Checkbox id="claimed" />
                                            <label htmlFor="claimed" className="text-sm">
                                                Claimed <Info className="inline h-4 w-4 text-muted-foreground" />
                                            </label>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <h2 className="font-semibold">Related categories</h2>
                                            <Button variant="link" className="text-sm">
                                                Show all
                                            </Button>
                                        </div>
                                        <div className="space-y-2">
                                            {categories.map((category) => (
                                                <div
                                                    key={category.name}
                                                    className="flex items-center justify-between text-sm"
                                                >
                                                    <span className="hover:underline cursor-pointer">
                                                        {category.name}
                                                    </span>
                                                    <span className="text-muted-foreground">{category.count}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Results */}
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm text-muted-foreground">1-20 of 2,753 results</p>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm">Sort by</span>
                                            <Select defaultValue="relevant">
                                                <SelectTrigger className="w-[180px]">
                                                    <SelectValue placeholder="Sort by" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="relevant">Most relevant</SelectItem>
                                                    <SelectItem value="rating">Highest rating</SelectItem>
                                                    <SelectItem value="reviews">Most reviews</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <div className="rounded-lg bg-blue-50 p-4 flex items-start gap-2">
                                        <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                                        <div>
                                            <p className="font-medium">What does sorting by relevance mean?</p>
                                            <Button variant="link" className="h-auto p-0">
                                                Read more
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        {companies.map((company) => (
                                            <div key={company.id} className="border rounded-lg p-6 space-y-4">
                                                <div className="flex items-start gap-4">
                                                    <img
                                                        src={company.logo}
                                                        alt={company.name}
                                                        className="w-16 h-16 rounded-full object-cover"
                                                    />
                                                    <div className="flex-1">
                                                        <div className="flex items-start justify-between">
                                                            <div>
                                                                <h3 className="text-xl font-semibold">
                                                                    {company.name}
                                                                </h3>
                                                                <p className="text-sm text-muted-foreground">
                                                                    {company.domain}
                                                                </p>
                                                            </div>
                                                            <Badge variant="outline" className="uppercase">
                                                                Most Relevant
                                                            </Badge>
                                                        </div>
                                                        <div className="mt-2 flex items-center gap-2">
                                                            <div className="flex">
                                                                {Array(5)
                                                                    .fill(null)
                                                                    .map((_, i) => (
                                                                        <Star
                                                                            key={i}
                                                                            className="h-5 w-5 text-green-500"
                                                                            fill="currentColor"
                                                                        />
                                                                    ))}
                                                            </div>
                                                            <span className="text-sm">TrustScore {company.rating}</span>
                                                            <span className="text-sm text-muted-foreground">
                                                                {company.reviews.toLocaleString()} reviews
                                                            </span>
                                                        </div>
                                                        <p className="mt-1 text-sm">{company.location}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <Globe className="h-4 w-4 text-muted-foreground" />
                                                    <Mail className="h-4 w-4 text-muted-foreground" />
                                                    <Phone className="h-4 w-4 text-muted-foreground" />
                                                    {company.categories.map((category, index) => (
                                                        <span
                                                            key={index}
                                                            className="text-sm text-blue-600 hover:underline cursor-pointer"
                                                        >
                                                            {category}
                                                            {index < company.categories.length - 1 && ' • '}
                                                        </span>
                                                    ))}
                                                    <Button variant="link" className="text-sm p-0">
                                                        Latest reviews <ChevronDown className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
