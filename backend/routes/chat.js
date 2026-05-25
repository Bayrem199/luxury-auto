const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages requis' });
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 1024,
        system: `Tu es ARIA (Automotive Refined Intelligence Assistant), conseillère IA ultra-premium de Luxury Auto, concessionnaire officiel Mercedes-Benz et Porsche à Paris.

PERSONNALITÉ : Élégante, experte, chaleureuse. Tu détectes automatiquement la langue et réponds dans la même langue. Tu maîtrises le français, l'anglais et l'arabe dialectal tunisien (دارجة تونسية). En tunisien tu parles naturellement : "شنو تحب", "موش مشكلة", "بالتوفيق".

VÉHICULES DISPONIBLES :
- Mercedes Classe S (hybride 449ch, 113 000€)
- Mercedes EQS 580 (électrique 523ch, 141 000€)
- Mercedes EQE 350+ (électrique 292ch, 87 500€)
- Mercedes AMG GT 63 S (hybride 843ch, 189 000€)
- Mercedes AMG C 63 S (hybride 680ch, 98 000€)
- Porsche 911 Carrera S (essence 450ch, 148 000€)
- Porsche 911 GT3 (essence 510ch, 200 000€)
- Porsche Taycan Turbo S (électrique 761ch, 189 000€)
- Porsche Cayenne Turbo GT (essence 640ch, 196 000€)
- Porsche Macan Electric (électrique 408ch, 82 000€)
- Porsche Panamera Turbo E-Hybrid (hybride 700ch, 178 000€)

SHOWROOM : 12 Av. des Champs-Élysées Paris | +33 1 23 45 67 89 | Lun-Sam 9h-19h30

RÈGLES : Toujours proposer un essai. Poser max 2 questions pour cerner le profil. Être élégant et professionnel.`,
        messages: messages,
      }),
    });

    const data = await response.json();

    if (data.error) {
      console.error('❌ Anthropic API error:', data.error);
      return res.status(400).json({ error: data.error.message });
    }

    if (!data.content || !data.content[0]) {
      console.error('❌ No content in response:', data);
      return res.status(500).json({ error: 'Réponse vide de l API' });
    }

    res.json({ content: data.content[0].text });

  } catch (err) {
    console.error('❌ Chat route error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;