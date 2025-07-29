<?php
header('Content-Type: application/json');

// 模拟数据库检查
$domain = isset($_GET['domain']) ? strtolower(trim($_GET['domain'])) : '';

if (empty($domain)) {
    echo json_encode(['error' => '域名参数缺失']);
    exit;
}

// 检查域名格式
if (!preg_match('/^[a-z0-9\-]+\.cool$/', $domain)) {
    echo json_encode(['error' => '无效的.COOL域名格式']);
    exit;
}

// 模拟域名可用性检查 (随机)
$isAvailable = rand(0, 1) === 1;
$price = 25.99;

// 返回结果
echo json_encode([
    'domain' => $domain,
    'available' => $isAvailable,
    'price' => $price,
    'currency' => 'USD'
]);
?>