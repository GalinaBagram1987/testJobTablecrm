import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    // 1. Сначала получаем данные из тела запроса
    const bodyData = await request.json();
    const { url, method = 'GET', token, body } = bodyData || {};

    if (!url) {
      return NextResponse.json({ message: 'Missing url' }, { status: 400 });
    }

    // 2. Проверяем наличие базового URL в .env
    const base = process.env.API_BASE_URL;
    if (!base) {
      console.error('[PROXY] API_BASE_URL is not defined');
      return NextResponse.json({ message: 'Server configuration error' }, { status: 500 });
    }

    // 3. Формируем итоговый URL
    const normalizedBaseUrl = base.replace(/\/+$/, '');
    const normalizedUrl = url.startsWith('/') ? url : `/${url}`;
    let targetUrl = `${normalizedBaseUrl}${normalizedUrl}`;

    // 4. Добавляем токен в Query String (как требует ваше API)
    if (token) {
      const separator = targetUrl.includes('?') ? '&' : '?';
      targetUrl = `${targetUrl}${separator}token=${token}`;
    }

    const upperMethod = String(method).toUpperCase();
    console.log(`[PROXY] ${upperMethod} -> ${targetUrl}`);

    // 5. Настраиваем заголовки и опции запроса
    const headers = {
      'Accept': 'application/json',
    };

    const fetchOptions = {
      method: upperMethod,
      headers,
    };

    // Добавляем тело только если это не GET/HEAD
    if (upperMethod !== 'GET' && upperMethod !== 'HEAD' && body != null) {
      headers['Content-Type'] = 'application/json';
      fetchOptions.body = JSON.stringify(body);
    }

    // 6. Делаем запрос к реальному API
    const response = await fetch(targetUrl, fetchOptions);
    const contentType = response.headers.get('content-type') || '';
    const text = await response.text();

    // 7. Парсим ответ
    let data;
    if (contentType.includes('application/json')) {
      try {
        data = text ? JSON.parse(text) : null;
      } catch (e) {
        data = { message: 'Invalid JSON from upstream', raw: text };
      }
    } else {
      data = { raw: text };
    }

    // 8. Возвращаем результат
    if (!response.ok) {
      return NextResponse.json({
        message: data?.message || data?.error || `Upstream failed: ${response.status}`,
        status: response.status,
        url: targetUrl,
        details: data,
      }, { status: response.status });
    }

    return NextResponse.json(data, { status: response.status });

  } catch (error) {
    console.error('[PROXY] internal error:', error);
    return NextResponse.json({
      message: 'Internal proxy error',
      details: error.message,
    }, { status: 500 });
  }
}