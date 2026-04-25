import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    // Извлекаем параметры из тела запроса
    const { url, method = 'POST', body, token } = await request.json();

    // Валидация
    if (!url || !token) {
      return NextResponse.json({ error: 'Missing url or token' }, { status: 400 });
    }

    // Формируем целевой URL для TableCrm
    const targetUrl = `https://app.tablecrm.com/api/v1/${url}?token=${token}`;

    // Выполняем запрос к TableCrm
    const response = await fetch(targetUrl, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
    });

    // Получаем данные и возвращаем клиенту
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}