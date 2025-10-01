import type { Local } from "@/types/ebay/global/types";
import type { ErrorDetailV3, InventoryItemWithSkuLocale } from "@/types/ebay/listing-management/inventory-api/inventory-api-global-types";

/**
 * This call can be used to create and/or update up to 25 new inventory item records.
 * It is up to sellers whether they want to create a complete inventory item records right from the start,
 * or sellers can provide only some information with the initial bulkCreateOrReplaceInventoryItem call,
 * and then make one or more additional bulkCreateOrReplaceInventoryItem calls to complete all required fields for the inventory item records and prepare for publishing.
 * Upon first creating inventory item records, only the SKU values are required.
 *
 * Publish offer note: Fields may be optional or conditionally required when calling this method, but become required when publishing the offer to create an active listing. For this method, see Inventory item fields for a list of fields required to publish an offer.
 */
export type BulkCreateOrReplaceInventoryItem = {
  /**
   * The details of each inventory item that is being created or updated is passed in under this container.
   * Up to 25 inventory item records can be created and/or updated with one bulkCreateOrReplaceInventoryItem call.
   * Occurrence: Required
   */
  requests: InventoryItemWithSkuLocale[];
};

/**
 * This is the base container of the bulkCreateOrReplaceInventoryItem response.
 * The results of each attempted inventory item creation/update is captured under this container.
 * Occurrence: Always
 */
export type BulkCreateOrReplaceInventoryItemResponse = {
  responses: InventoryItemResponse[];
};

/**
 * The results of each attempted inventory item creation/update is captured under this container.
 */
export type InventoryItemResponse = {
  /**
   * This container will be returned if there were one or more errors associated with the creation or update to the inventory item record.
   * Occurrence: Conditional
   */
  errors?: ErrorDetailV3[];
  /**
   * This field returns the natural language that was provided in the field values of the request payload (i.e., en_AU, en_GB or de_DE).
   * Occurrence: Always
   */
  locale: Local;
  /**
   * The seller-defined Stock-Keeping Unit (SKU) of the inventory item.
   * The seller should have a unique SKU value for every product that they sell.
   * Occurrence: Always
   */
  sku: string;
  /**
   * The HTTP status code returned in this field indicates the success or failure of creating or updating the inventory item record for the inventory item indicated in the sku field.
   * See the HTTP status codes table to see which each status code indicates.
   * Occurrence: Always
   */
  statusCode: number;
  /**
   * This container will be returned if there were one or more warnings associated with the creation or update to the inventory item record.
   * Occurrence: Conditional
   */
  warnings?: ErrorDetailV3[];
};

/**
 * @summary Bulk Create or Replace Inventory Item
 * @description This call can be used to create and/or update up to 25 new inventory item records.
 * It is up to sellers whether they want to create a complete inventory item records right from the start,
 * or sellers can provide only some information with the initial bulkCreateOrReplaceInventoryItem call,
 * and then make one or more additional bulkCreateOrReplaceInventoryItem calls to complete all required fields for the inventory item records and prepare for publishing.
 * Upon first creating inventory item records, only the SKU values are required.
 *
 * Publish offer note: Fields may be optional or conditionally required when calling this method, but become required when publishing the offer to create an active listing. For this method, see Inventory item fields for a list of fields required to publish an offer.
 *
 * @method POST
 * @path /sell/inventory/v1/bulk_create_or_replace_inventory_item
 * @authentication OAuth access token with scope: https://api.ebay.com/oauth/api_scope/sell.inventory
 * @headers Content-Language: string (Required, e.g., en-US or de-DE), Content-Type: application/json (Required)
 * @body BulkCreateOrReplaceInventoryItem
 * @response 200 { "responses": [ { "locale": "en_US", "sku": "test-sku-1", "statusCode": 200 }, { "locale": "en_US", "sku": "test-sku-2", "statusCode": 200 } ] }
 * @response 207 { "responses": [ { "locale": "en_US", "sku": "test-sku-1", "statusCode": 200 }, { "errors": [ { "category": "REQUEST", "domain": "API_INVENTORY", "errorId": 25707, "longMessage": "Invalid sku. sku has to be alphanumeric with upto 50 characters in length", "message": "Invalid sku", "parameters": [ { "name": "additionalInfo", "value": "sku has to be alphanumeric with upto 50 characters in length" } ] } ], "locale": "en_US", "sku": "invalid-sku!", "statusCode": 400 } ] }
 * @response 400 { "errors": [ { "category": "REQUEST", "domain": "API_INVENTORY", "errorId": 25727, "longMessage": "The number of InventoryItems in the request cannot exceed 25.", "message": "The number of InventoryItems in the request cannot exceed 25.", "parameters": [ { "name": "additionalInfo", "value": "25" } ] } ] }
 * @response 500 { "errors": [ { "category": "SYSTEM", "domain": "API_INVENTORY", "errorId": 25001, "longMessage": "Any System error. {additionalInfo}", "message": "Any System error.", "parameters": [ { "name": "additionalInfo", "value": "Internal server error" } ] } ] }
 * @error 25001 API_INVENTORY APPLICATION Any System error. {additionalInfo}
 * @error 25002 API_INVENTORY REQUEST Any User error. {additionalInfo}
 * @error 25003 API_INVENTORY REQUEST Invalid price. {additionalInfo}
 * @error 25004 API_INVENTORY REQUEST Invalid quantity. {additionalInfo}
 * @error 25005 API_INVENTORY REQUEST Invalid category. {additionalInfo}
 * @error 25006 API_INVENTORY REQUEST Invalid listing option. {additionalInfo}
 * @error 25007 API_INVENTORY REQUEST Invalid Shipping policy information. {additionalInfo}
 * @error 25008 API_INVENTORY REQUEST Invalid Payment policy information. {additionalInfo}
 * @error 25009 API_INVENTORY REQUEST Invalid Return policy information. {additionalInfo}
 * @error 25011 API_INVENTORY REQUEST Invalid tax information. {additionalInfo}
 * @error 25012 API_INVENTORY REQUEST Invalid location. {additionalInfo}
 * @error 25013 API_INVENTORY REQUEST This error code is associated with multiple possible errors. See 25013 Invalid data in the Inventory Item Group for the full list of messages returned and any available troubleshooting information.
 * @error 25014 API_INVENTORY REQUEST Invalid pictures. {additionalInfo}
 * @error 25015 API_INVENTORY REQUEST Invalid picture URL. {additionalInfo}
 * @error 25016 API_INVENTORY REQUEST Invalid {fieldName}. {additionalInfo}
 * @error 25017 API_INVENTORY REQUEST This error code is associated with multiple possible errors. See 25017 Missing information in fields for the full list of messages returned and any available troubleshooting information.
 * @error 25018 API_INVENTORY REQUEST This error code is associated with multiple possible errors. See 25018 Incomplete account information for the full list of messages returned and any available troubleshooting information.
 * @error 25019 API_INVENTORY REQUEST This error code is associated with multiple possible errors. See 25019 Cannot revise the listing for the full list of messages returned and any available troubleshooting information.
 * @error 25020 API_INVENTORY REQUEST Invalid package details. {additionalInfo}
 * @error 25021 API_INVENTORY REQUEST Invalid condition information. {additionalInfo}
 * @error 25022 API_INVENTORY REQUEST Invalid attribute. {fieldName}
 * @error 25023 API_INVENTORY REQUEST Invalid compatibility information. {additionalInfo}
 * @error 25025 API_INVENTORY APPLICATION Concurrent access of Inventory or InventoryItemGroup. Please try again later
 * @error 25026 API_INVENTORY REQUEST Selling limits exceeded. {additionalInfo}
 * @error 25097 API_INVENTORY REQUEST This listing is on hold due to a policy violation, and revisions are not possible. Please check your email for more information.
 * @error 25098 API_INVENTORY REQUEST {replaceable_value} transaction is not possible as the parent listing is on-hold. Please check your email for further information.
 * @error 25123 API_INVENTORY REQUEST This P&A listing has a non-compliant domestic return policy. Please update the return window to 30-days (or more) and/or update return shipping cost payer to Seller, and then make another call. Sellers using business policies must make the same changes to their return business policy and then make another call. To learn more, visit https://www.ebay.com/sellercenter/news/2025-june/parts-accessories-return-policy.
 * @error 25501 API_INVENTORY REQUEST Invalid picture. {additionalInfo}
 * @error 25502 API_INVENTORY REQUEST Invalid attribute information. {additionalInfo}
 * @error 25503 API_INVENTORY REQUEST Invalid product information. {additionalInfo}
 * @error 25601 API_INVENTORY REQUEST Invalid attribute. {fieldName}
 * @error 25604 API_INVENTORY REQUEST Input error. {additionalInfo}
 * @error 25701 API_INVENTORY REQUEST These SKU(s) are not in the system
 * @error 25702 API_INVENTORY REQUEST SKU {additionalInfo} is not available in the system
 * @error 25707 API_INVENTORY REQUEST Invalid sku. sku has to be alphanumeric with upto 50 characters in length
 * @error 25708 API_INVENTORY REQUEST Invalid sku
 * @error 25709 API_INVENTORY REQUEST Invalid request. Invalid value for field {additionalInfo}
 * @error 25710 API_INVENTORY REQUEST We didn't find the resource/entity you are requesting. Please verify the request
 * @error 25713 API_INVENTORY REQUEST This Offer is not available : {additionalInfo}.
 * @error 25715 API_INVENTORY REQUEST Invalid Dimension and Weight
 * @error 25727 API_INVENTORY REQUEST The number of InventoryItems in the request cannot exceed {additionalInfo}.
 * @error 25728 API_INVENTORY REQUEST InventoryItems should be unique in the request.
 * @error 25733 API_INVENTORY REQUEST Valid SKU and locale information are required for all the InventoryItems in the request.
 * @error 25759 API_INVENTORY REQUEST shipToLocationAvailability quantity value should be greater than or equal to auction allocation. Please provide valid quantity or unpublish auction offers of the sku.
 * @warning 25096 API_INVENTORY REQUEST This listing is on hold due to a policy violation. You may revise it to resolve the situation. Please check your email for more information.
 * @warning 25124 API_INVENTORY REQUEST This P&A listing requires a minimum 30-day return period and seller-paid return shipping. eBay automatically updated the listing's return policy settings to meet these requirements. Sellers using business policies should update their return business policy for future P&A listings. To learn more, visit https://www.ebay.com/sellercenter/news/2025-june/parts-accessories-return-policy.
 * @warning 25401 API_INVENTORY APPLICATION Invalid listing options removed. {additionalInfo}
 * @warning 25402 API_INVENTORY APPLICATION System warning. {additionalInfo}
 * @warning 25504 API_INVENTORY APPLICATION {additionalInfo}
 * @warning 25753 API_INVENTORY REQUEST listingStartDate is in the past or the offer is live. Value is not updated on the listing.
 */
export type BulkCreateOrReplaceInventoryItemAPI = {
  method: "POST";
  path: "/sell/inventory/v1/bulk_create_or_replace_inventory_item";
  payload: BulkCreateOrReplaceInventoryItem;
  response: BulkCreateOrReplaceInventoryItemResponse;
};
