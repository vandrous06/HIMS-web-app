<?php
require 'db.php'; 

// Items Table CRUD Functions
function createItem($itemName, $description, $category, $unit, $reorderPoint, $supplierID) {
    global $conn;
    $sql = "INSERT INTO Items (ItemName, Description, Category, UnitOfMeasurement, ReorderPoint, SupplierID) VALUES (?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssssii", $itemName, $description, $category, $unit, $reorderPoint, $supplierID);
    return $stmt->execute();
}

function getItems() {
    global $conn;
    $sql = "SELECT * FROM Items";
    return $conn->query($sql);
}

function updateItem($itemID, $itemName, $description, $category, $unit, $reorderPoint, $supplierID) {
    global $conn;
    $sql = "UPDATE Items SET ItemName=?, Description=?, Category=?, UnitOfMeasurement=?, ReorderPoint=?, SupplierID=? WHERE ItemID=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssssiii", $itemName, $description, $category, $unit, $reorderPoint, $supplierID, $itemID);
    return $stmt->execute();
}

function deleteItem($itemID) {
    global $conn;
    $sql = "DELETE FROM Items WHERE ItemID=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $itemID);
    return $stmt->execute();
}

// CRUD functions for all other tables

$tables = [
    'Transactions' => ['TransactionID', ['ItemID', 'TransactionDate', 'TransactionType', 'Quantity', 'Remarks']],
    'Orders' => ['OrderID', ['SupplierID', 'OrderDate', 'ExpectedDeliveryDate', 'Status']],
    'OrderItems' => ['OrderItemID', ['OrderID', 'ItemID', 'QuantityOrdered', 'UnitPrice']],
    'Equipment' => ['EquipmentID', ['EquipmentName', 'Description', 'Condition', 'Location', 'MaintenanceSchedule']],
    'EquipmentMaintenance' => ['MaintenanceID', ['EquipmentID', 'MaintenanceDate', 'Description', 'Cost', 'Technician']],
    'Users' => ['UserID', ['Username', 'PasswordHash', 'Role']],
    'AccessControl' => ['AccessControlID', ['UserID', 'ItemID', 'AccessLevel']]
];

foreach ($tables as $table => [$primaryKey, $columns]) {
    $columnsList = implode(", ", $columns);
    $placeholders = implode(", ", array_fill(0, count($columns), "?"));
    $updateColumns = implode(", ", array_map(fn($col) => "$col=?", $columns));
    
    // Modified to use $params for function parameters
    $params = array_map(fn($col) => '$' . $col, $columns);
    $paramsList = implode(", ", $params);
    
    eval("function create$table($paramsList) {
        global \$conn;
        \$sql = \"INSERT INTO $table ($columnsList) VALUES ($placeholders)\";
        \$stmt = \$conn->prepare(\$sql);
        \$stmt->bind_param(\"" . str_repeat("s", count($columns)) . "\", " . $paramsList . ");
        return \$stmt->execute();
    }");
    
    eval("function get$table() {
        global \$conn;
        \$sql = \"SELECT * FROM $table\";
        return \$conn->query(\$sql);
    }");
    
    eval("function update$table(\$$primaryKey, $paramsList) {
        global \$conn;
        \$sql = \"UPDATE $table SET $updateColumns WHERE $primaryKey=?\";
        \$stmt = \$conn->prepare(\$sql);
        \$stmt->bind_param(\"" . str_repeat("s", count($columns) + 1) . "\", " . $paramsList . ", \$$primaryKey);
        return \$stmt->execute();
    }");
    
    eval("function delete$table(\$$primaryKey) {
        global \$conn;
        \$sql = \"DELETE FROM $table WHERE $primaryKey=?\";
        \$stmt = \$conn->prepare(\$sql);
        \$stmt->bind_param(\"s\", \$$primaryKey);
        return \$stmt->execute();
    }");
}

// Add this API request handler at the end of the file, before the closing PHP tag
if (isset($_GET['table']) && isset($_GET['action'])) {
    $table = ucfirst(strtolower($_GET['table'])); // Capitalize first letter
    $action = strtolower($_GET['action']);
    $response = array();

    switch ($action) {
        case 'read':
            $functionName = "get{$table}";
            if (function_exists($functionName)) {
                $result = $functionName();
                if ($result) {
                    while ($row = $result->fetch_assoc()) {
                        $response[] = $row;
                    }
                    echo json_encode($response);
                } else {
                    echo json_encode(array("error" => "Failed to fetch data"));
                }
            } else {
                echo json_encode(array("error" => "Invalid table name"));
            }
            break;
            
        // Add other cases for create, update, delete as needed
        default:
            echo json_encode(array("error" => "Invalid action"));
            break;
    }
} else {
    echo json_encode(array("error" => "Missing required parameters"));
}

?>
