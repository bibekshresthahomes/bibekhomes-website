<?php
declare(strict_types=1);
session_start();

if (empty($_SESSION['contact_token'])) {
    $_SESSION['contact_token'] = bin2hex(random_bytes(24));
}

$errors = [];
$sent = false;
$values = [
    'name' => '',
    'email' => '',
    'phone' => '',
    'interest' => '',
    'message' => ''
];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    foreach ($values as $field => $_) {
        $values[$field] = trim((string)($_POST[$field] ?? ''));
    }

    $token = (string)($_POST['token'] ?? '');
    $honeypot = trim((string)($_POST['company'] ?? ''));
    $consent = isset($_POST['consent']);

    if (!hash_equals($_SESSION['contact_token'], $token)) $errors[] = 'Please refresh the page and try again.';
    if ($honeypot !== '') $errors[] = 'Unable to submit this form.';
    if (mb_strlen($values['name']) < 2 || mb_strlen($values['name']) > 100) $errors[] = 'Please enter your name.';
    if (!filter_var($values['email'], FILTER_VALIDATE_EMAIL)) $errors[] = 'Please enter a valid email address.';
    if (mb_strlen($values['phone']) > 30) $errors[] = 'Please enter a valid phone number.';
    if (mb_strlen($values['message']) < 10 || mb_strlen($values['message']) > 3000) $errors[] = 'Please include a short message about how Bibek can help.';
    if (!$consent) $errors[] = 'Please confirm that Bibek may contact you about your inquiry.';

    if (!$errors) {
        $safeName = preg_replace('/[\r\n]+/', ' ', $values['name']);
        $safeEmail = str_replace(["\r", "\n"], '', $values['email']);
        $subject = 'New BibekHomes.com inquiry from ' . $safeName;
        $body = "New website inquiry\n\n"
            . "Name: {$safeName}\n"
            . "Email: {$safeEmail}\n"
            . "Phone: {$values['phone']}\n"
            . "Interest: {$values['interest']}\n\n"
            . "Message:\n{$values['message']}\n";
        $headers = [
            'Reply-To' => $safeEmail,
            'Content-Type' => 'text/plain; charset=UTF-8'
        ];

        $sent = mail('contact@bibekhomes.com', $subject, $body, $headers);
        if ($sent) {
            $_SESSION['contact_token'] = bin2hex(random_bytes(24));
            foreach ($values as $field => $_) $values[$field] = '';
        } else {
            $errors[] = 'Your message could not be sent right now. Please call or email Bibek directly.';
        }
    }
}

function e(string $value): string { return htmlspecialchars($value, ENT_QUOTES, 'UTF-8'); }
?>
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="description" content="Contact Bibek Shrestha for personal East Bay real estate guidance in Walnut Creek, Antioch and surrounding communities.">
<meta name="theme-color" content="#111614">
<title>Contact Bibek | Bibek Shrestha Real Estate</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Manrope:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,500;0,600;1,500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../assets/css/styles.css?v=premium-1">
<link rel="stylesheet" href="../assets/css/refinements.css?v=refine-1">
<link rel="stylesheet" href="../assets/css/contact.css?v=contact-1">
</head>
<body>
<header class="site-header premium-header"><div class="container navbar">
  <a class="brand" href="../index.html"><div class="monogram">BS</div><div class="brand-copy"><strong data-agent-name></strong><span>East Bay Real Estate</span></div></a>
  <button class="mobile-menu" data-menu-button aria-label="Open navigation" aria-expanded="false">Menu</button>
  <nav class="main-nav" data-main-nav><a href="../index.html">Home</a><a href="../about/index.html">About</a><a href="../index.html#areas">Areas</a><a href="../search-homes/index.html">Buy</a><a href="../home-value/index.html">Sell</a><a aria-current="page" href="index.php">Contact</a></nav>
  <div class="nav-actions"><a class="btn btn-small" data-agent-phone-link href="#"><span data-agent-phone></span></a></div>
</div></header>

<main>
  <section class="contact-hero"><div class="container contact-hero-grid"><div><p class="kicker">Let’s connect</p><h1>Tell Bibek where<br><em>you want to go.</em></h1></div><p>Whether you’re ready to move or simply weighing your options, start with a personal, no-pressure conversation.</p></div></section>

  <section class="contact-section"><div class="container contact-grid">
    <aside class="contact-details">
      <div class="contact-portrait" role="img" aria-label="Bibek Shrestha"></div>
      <p class="kicker dark">Direct contact</p><h2>Bibek Shrestha</h2><p class="contact-role">Real Estate Advisor<br>Keller Williams Realty East Bay</p>
      <div class="contact-methods">
        <a data-agent-phone-link href="#"><small>Call or text</small><strong data-agent-phone></strong></a>
        <a data-agent-email-link href="#"><small>Email</small><strong data-agent-email></strong></a>
      </div>
      <dl><div><dt>Serving</dt><dd>Walnut Creek, Antioch &amp; the East Bay</dd></div><div><dt>Languages</dt><dd>English, Nepali &amp; Hindi</dd></div><div><dt>License</dt><dd data-agent-license></dd></div></dl>
      <a class="schedule-link" href="../book-consultation/index.html">Prefer a scheduled meeting? Use the KW calendar&nbsp; ↗</a>
    </aside>

    <div class="contact-form-wrap">
      <p class="kicker dark">Send a message</p><h2>How can Bibek help?</h2>
      <?php if ($sent): ?><div class="form-status success" role="status"><strong>Thank you.</strong><p>Your message has been sent to Bibek. He’ll be in touch soon.</p></div><?php endif; ?>
      <?php if ($errors): ?><div class="form-status error" role="alert"><strong>Please check the form.</strong><ul><?php foreach ($errors as $error): ?><li><?= e($error) ?></li><?php endforeach; ?></ul></div><?php endif; ?>
      <form class="contact-form" method="post" action="index.php" novalidate>
        <input type="hidden" name="token" value="<?= e($_SESSION['contact_token']) ?>">
        <div class="form-honeypot" aria-hidden="true"><label>Company<input type="text" name="company" tabindex="-1" autocomplete="off"></label></div>
        <div class="form-row"><label>Full name *<input type="text" name="name" required maxlength="100" autocomplete="name" value="<?= e($values['name']) ?>"></label><label>Email address *<input type="email" name="email" required maxlength="180" autocomplete="email" value="<?= e($values['email']) ?>"></label></div>
        <div class="form-row"><label>Phone number<input type="tel" name="phone" maxlength="30" autocomplete="tel" value="<?= e($values['phone']) ?>"></label><label>I’m interested in<select name="interest"><option value="">Select one</option><?php foreach (['Buying a home','Selling a home','Investing','Home value','Relocating','General question'] as $option): ?><option value="<?= e($option) ?>" <?= $values['interest'] === $option ? 'selected' : '' ?>><?= e($option) ?></option><?php endforeach; ?></select></label></div>
        <label>How can Bibek help? *<textarea name="message" required minlength="10" maxlength="3000" rows="7" placeholder="Share your goals, preferred areas, timing, or questions."><?= e($values['message']) ?></textarea></label>
        <label class="consent"><input type="checkbox" name="consent" required><span>I agree that Bibek Shrestha may contact me by phone, text, or email regarding my real estate inquiry. Consent is not required to purchase services.</span></label>
        <button class="btn btn-dark form-submit" type="submit">Send Message</button>
        <p class="form-privacy">Your information is used only to respond to your inquiry and is not sold.</p>
      </form>
    </div>
  </div></section>
</main>

<footer class="site-footer premium-footer"><div class="container footer-grid"><div><a class="brand" href="../index.html"><div class="monogram">BS</div><div class="brand-copy"><strong data-agent-name></strong><span>East Bay Real Estate</span></div></a><p>Personal representation backed by Keller Williams Realty East Bay.</p></div><div><h4>Explore</h4><a href="../about/index.html">About Bibek</a><a href="../index.html#areas">Areas</a><a href="index.php">Contact</a></div><div><h4>Real Estate</h4><a href="../search-homes/index.html">Buy a Home</a><a href="../home-value/index.html">Sell a Home</a><a href="../mortgage-calculator/index.html">Mortgage Calculator</a></div><div><h4>Connect</h4><a data-agent-phone-link href="#"><span data-agent-phone></span></a><a data-agent-email-link href="#"><span data-agent-email></span></a><p data-agent-license></p></div></div><div class="container legal"><span>© <span data-current-year></span> Bibek Shrestha</span><span>Keller Williams Realty East Bay · Each office is independently owned and operated.</span></div></footer>
<script src="../assets/js/config.js"></script><script src="../assets/js/site.js"></script>
</body></html>
