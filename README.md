# Haven — Statamic Starter Kit

Haven is a lifestyle commerce starter kit with nine catalogues: jewellery, furniture, apparel, home, beauty, plants, workshop, lighting, and stationery. Built for Statamic 5, it keeps one visual design and swaps demo copy through a post-install industry setup.

**One Page template.** Marketing pages use Theme sections in the Control Panel. Functional templates cover product detail, shop cart, blog detail, category archive, account, and sign-in shells.

Shoppers add items to a session cart and send a cart or product inquiry. There is no card checkout or payment capture.

## Live demo

[https://haven.webbydemo.in](https://haven.webbydemo.in)

---

## After install — choose an industry

Starter-kit install is non-interactive. Run one command to apply a niche demo pack:

```bash
php please haven:setup apparel
# or: furniture | jewellery | home | beauty | plants | workshop | lighting | stationery
```

This sets `Setting.industry`, replaces sample products (and matching blog titles), and refreshes the Stache. If you skip it, the default pack is **apparel**.

The command asks before it deletes products and journal entries. Pass `--force` to skip that question:

```bash
php please haven:setup jewellery --force
```

Register the kit provider once after install (do not replace `AppServiceProvider`):

```php
// bootstrap/providers.php
App\Providers\HavenServiceProvider::class,
```

---

## Pages

| Page | URL | Notes |
|---|---|---|
| Home | `/` | page_builder |
| Home Two | `/home-two` | second home from the HTML index-two layout |
| Shop | `/shop` | full catalogue |
| Shop now | `/shop-now` | same catalogue as cards |
| Shop gallery | `/shop-masonry` | same catalogue as a masonry gallery |
| Search | `/search` | pieces and journal notes |
| Product detail | `/products/{slug}` | `products/show` |
| Category | `/categories/{slug}` | `category` |
| Collection | `/collection` | page_builder + shop_products collection style |
| Cart | `/cart` | session cart |
| Checkout | `/checkout` | cart inquiry, no card charge |
| Blog | `/blog` | page_builder + blogs |
| Journal grid | `/blog-grid` | card grid |
| Journal masonry | `/blog-masonry` | masonry journal |
| Blog detail | `/blog/{slug}` | `blogs/show` |
| About | `/about` | page_builder |
| Contact | `/contact` | page_builder + contact_form |
| Account | `/account` | nonfunctional design shell — no orders, downloads, saved cards, or login |
| Accounts note | `/login` | does not register users, store passwords, or reset logins |
| Missing page | any unknown URL | error page |

---

## Theme sections (page_builder)

`home_hero`, `home_hero_two`, `about_intro`, `collection_feature`, `explore_slider`, `explore_tiles`, `features`, `best_collection`, `video_feature`, `video_story`, `shop_products` (grid / shop page / shop now / masonry / collection / featured), `newsletter`, `blogs` (grid / blog page / card grid / masonry / latest slider), `contact_form`, `contact_details`, `heading_banner`, `legal_copy`

---

## Collections and taxonomies

- **Pages** — marketing pages with Theme sections and an SEO tab
- **Products** — catalogue with image, price, optional option sets, and an SEO tab
- **Blogs** — journal posts with an SEO tab
- **Categories** taxonomy — group products by industry niche, with an SEO tab

## Globals

- **Setting** — site name, industry, logo, phone, email, address, social, form button/success copy, default SEO description and social image

## Navigation

- `header_menu`, `footer_menu` — edit destinations in the Control Panel

---

## Features

- Lifestyle storefront with shared jewellery-derived design (`jw_` CSS classes kept)
- Industry packs under `content/industries/` for jewellery, furniture, apparel, home, beauty, plants, workshop, lighting, and stationery
- Session cart with add / update / remove
- Product inquiry and cart inquiry instead of card payment
- AJAX forms via `theme-forms.js` (no `js="true"` on form tags)
- Header and footer wired to nav and Setting globals

---

## Forms (Statamic Pro)

| Form | Handle |
|---|---|
| Contact | `contact` |
| Newsletter | `newsletter` |
| Product inquiry | `product_inquiry` |
| Cart inquiry | `cart_inquiry` |

Statamic Core includes one form. Use **Statamic Pro** if you keep all four. Set each form email recipient in **CP → Forms** after install.

---

## Installation

Follow the [Starter Kit installation instructions](https://statamic.dev/starter-kits/installing-a-starter-kit).  
Requires **Statamic 5.x**.

```bash
statamic new my-site webbycrown/haven-statamic-theme

# or into an existing site
php please starter-kit:install webbycrown/haven-statamic-theme
```

Then:

```bash
# Register HavenServiceProvider (see above)
php please haven:setup apparel
php please stache:refresh
```

This kit does not export `routes/`. Your `routes/web.php` stays as it is. `HavenServiceProvider` registers `/search`, `/cart`, `/checkout`, `/categories/{slug}`, and the cart add, update, and remove posts.

Optional HTML redirects, only if old template filenames still get traffic. New Statamic sites do not need these. Add them to your own `routes/web.php`:

```php
Route::redirect('/index-two.html', '/home-two');
Route::redirect('/index.html', '/');
Route::redirect('/shop.html', '/shop');
Route::redirect('/single-product.html', '/shop');
Route::redirect('/about.html', '/about');
Route::redirect('/contact.html', '/contact');
Route::redirect('/blog.html', '/blog');
Route::redirect('/blog-grid.html', '/blog-grid');
Route::redirect('/blogs-masonary.html', '/blog-masonry');
Route::redirect('/blog-detail.html', '/blog');
Route::redirect('/cart.html', '/cart');
Route::redirect('/checkout.html', '/checkout');
Route::redirect('/login.html', '/login');
Route::redirect('/account-page.html', '/account');
Route::redirect('/error.html', '/');
```

---

## Third-party libraries

See [THIRD_PARTY.md](THIRD_PARTY.md) for bundled front-end libraries and licences.

---

## Support

Questions and issues: [github.com/webbycrown/haven-statamic-theme/issues](https://github.com/webbycrown/haven-statamic-theme/issues) or [WebbyCrown](https://www.webbycrown.com/custom-statamic-development-services-company/).

## Changelog

### v1.0.3

- Marketplace images are screenshots of the running kit
- The picture on the right of the home page is the wool coat
- Category archives list the products assigned to that category
- An empty category says that nothing is filed there
- Header search opens from the button, including with Enter
- Cart totals use the same currency symbol as the catalogue
- Category archives clear the fixed header on a phone, and the product grid has space between cards

### v1.0.2

- The contact form escapes the name, phone, email, and message it prints back
- scroll-zoom.js keeps the Codrops copyright and MIT notice

### v1.0.1

- Search text and category headings are escaped before they are printed
- `haven:setup` asks before it replaces products and journal entries
- A successful cart inquiry empties the session cart

## Credit

Theme by [WebbyCrown](https://webbycrown.com).
