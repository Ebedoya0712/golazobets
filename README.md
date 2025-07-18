## Golazobets

<small>Developed by @fitodac</small>

### Local environment

1. Initialize Sail

```bash
sail start
```

2. Initialize NPM

```bash
npm run dev
```

3. Initialize reverb server <br/>(not on Laravel Cloud)

```bash
sail artisan reverb:start
```

4. Initialize the queue

```bash
sail artisan queue:work
```

<br/>
<br/>

## Database backups

Run manually:

```bash
php artisan backup:run --only-db
```

<br/>
<br/>

## Composer on Hostinger

To run composer you need to download composer2:
```bash
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php composer-setup.php --2
php -r "unlink('composer-setup.php');"
```
<br/>

And then run composer:
```bash
php composer.phar install
```

<br/>
<br/>

## Cron jobs
Cron are neccesary to run the queue.

Add the following CRON:

```
*/5 * * * * cd /home/u952906787/domains/pruebasgolazobets.shop && php artisan queue:listen --memory=128 --timeout=60 --tries=3 --sleep=3
```

On Hostinger pannel, the route for artisan is:
```
/usr/bin/php /home/u922906787/ domains/pruebasgolazobets.shop/artisan ...
```

<br/>

## Update all tipster stats
This must be executed on local environment, not on production!

Just run
```bash
sail artisan tipsters:update-stats
```
<br/>

### Stripe

Valid credit cards for testing: https://docs.stripe.com/testing#testing-interactively
#   g o l a z o b e t s  
 