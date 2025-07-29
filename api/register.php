<?php
header('Content-Type: application/json');

// 模拟域名注册
$data = json_decode(file_get_contents('php://input'), true);

if (!$data || !isset($data['domain']) || !isset($data['years']) || !isset($data['contact'])) {
    echo json_encode(['success' => false, 'message' => '无效的请求数据']);
    exit;
}

// 验证域名格式
if (!preg_match('/^[a-z0-9\-]+\.cool$/', $data['domain'])) {
    echo json_encode(['success' => false, 'message' => '无效的.COOL域名格式']);
    exit;
}

// 验证年限
$years = intval($data['years']);
if ($years < 1 || $years > 10) {
    echo json_encode(['success' => false, 'message' => '注册年限必须在1-10年之间']);
    exit;
}

// 验证联系信息
if (empty($data['contact']['name']) || empty($data['contact']['email'])) {
    echo json_encode(['success' => false, 'message' => '姓名和电子邮件是必填项']);
    exit;
}

// 模拟成功注册
$expiryDate = date('Y-m-d', strtotime("+{$years} years"));

echo json_encode([
    'success' => true,
    'message' => '域名注册成功',
    'domain' => $data['domain'],
    'years' => $years,
    'expiry_date' => $expiryDate,
    'contact' => $data['contact']
]);
?>