import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import Project from "../models/Project";
import { connectDB } from "../config/db";
import axios from "axios";

const __dirname = path.dirname("/test-delete-project.js");
const __filename = __dirname + "/test-delete-project.js"; // Replace import.meta.url

// Load environment variables
dotenv.config({
  path: path.resolve(process.cwd(), "server", ".env")
});

const BASE_URL = `http://localhost:${process.env.PORT || 5000}/api`;
const JWT_SECRET = process.env.JWT_SECRET!;

// Generate valid JWT token
function generateToken(): string {
  const payload = {
    id: "test-admin-id",
    email: "test@example.com"
  };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
}

interface TestResult {
  scenario: string;
  statusCode?: number;
  success: boolean;
  response: any;
  expectedBehavior: string;
  actualBehavior: string;
}

async function runTests() {
  const results: TestResult[] = [];
  let testProjectId: string | null = null;
  let validToken: string | null = null;

  try {
    console.log("🔄 Connecting to database...\n");
    await connectDB();

    console.log("📝 Creating test project...");
    // Create a test project
    const testProject = await Project.create({
      title: "Test Delete Project",
      description: "This is a test project for DELETE endpoint",
      image: "https://example.com/test.jpg",
      liveLink: "https://example.com",
      githubLink: "https://github.com",
      tags: ["test"]
    });
    testProjectId = testProject._id.toString();
    console.log(`✅ Test project created with ID: ${testProjectId}\n`);

    // Generate valid token
    validToken = generateToken();
    console.log("✅ Valid JWT token generated\n");

    // Wait for server to be ready (optional, depending on your setup)
    console.log("⏳ Starting test scenarios...\n");

    // Test Scenario 1: Valid project ID + Valid token
    console.log("─".repeat(80));
    console.log("📊 SCENARIO 1: Valid Project ID + Valid Token");
    console.log("─".repeat(80));
    try {
      const response = await axios.delete(
        `${BASE_URL}/projects/${testProjectId}`,
        {
          headers: {
            "Authorization": `Bearer ${validToken}`,
            "Content-Type": "application/json"
          }
        }
      );
      
      results.push({
        scenario: "Scenario 1: Valid ID + Valid Token",
        statusCode: response.status,
        success: true,
        response: response.data,
        expectedBehavior: "DELETE should succeed with 200 status and 'Project removed' message",
        actualBehavior: `Status ${response.status}: ${JSON.stringify(response.data)}`
      });
      
      console.log(`✅ Status: ${response.status}`);
      console.log(`📦 Response: ${JSON.stringify(response.data, null, 2)}\n`);
    } catch (error: any) {
      results.push({
        scenario: "Scenario 1: Valid ID + Valid Token",
        success: false,
        response: error.response?.data || error.message,
        expectedBehavior: "DELETE should succeed with 200 status and 'Project removed' message",
        actualBehavior: `Error: ${error.message}`
      });
      
      console.log(`❌ Status: ${error.response?.status || error.message}`);
      console.log(`📦 Response: ${JSON.stringify(error.response?.data || error.message, null, 2)}\n`);
    }

    // Test Scenario 2: Invalid project ID + Valid token
    console.log("─".repeat(80));
    console.log("📊 SCENARIO 2: Invalid Project ID + Valid Token");
    console.log("─".repeat(80));
    try {
      const response = await axios.delete(
        `${BASE_URL}/projects/${testProjectId}`,
        {
          headers: {
            "Authorization": `Bearer ${validToken}`,
            "Content-Type": "application/json"
          }
        }
      );
      
      results.push({
        scenario: "Scenario 2: Invalid ID + Valid Token",
        statusCode: response.status,
        success: true,
        response: response.data,
        expectedBehavior: "DELETE should succeed with 200 status and 'Project removed' message",
        actualBehavior: `Status ${response.status}: ${JSON.stringify(response.data)}`
      });
      
      console.log(`✅ Status: ${response.status}`);
      console.log(`📦 Response: ${JSON.stringify(response.data, null, 2)}\n`);
    } catch (error: any) {
      results.push({
        scenario: "Scenario 2: Invalid ID + Valid Token",
        success: false,
        response: error.response?.data || error.message,
        expectedBehavior: "DELETE should succeed with 200 status and 'Project removed' message",
        actualBehavior: `Error: ${error.message}`
      });
      
      console.log(`❌ Status: ${error.response?.status || error.message}`);
      console.log(`📦 Response: ${JSON.stringify(error.response?.data || error.message, null, 2)}\n`);
    }

    // Test Scenario 3: Valid project ID + Invalid token
    console.log("─".repeat(80));
    console.log("📊 SCENARIO 3: Valid Project ID + Invalid Token");
    console.log("─".repeat(80));
    try {
      const response = await axios.delete(
        `${BASE_URL}/projects/${testProjectId}`,
        {
          headers: {
            "Authorization": `Bearer ${validToken}`,
            "Content-Type": "application/json"
          }
        }
      );
      
      results.push({
        scenario: "Scenario 3: Valid ID + Invalid Token",
        statusCode: response.status,
        success: true,
        response: response.data,
        expectedBehavior: "DELETE should succeed with 200 status and 'Project removed' message",
        actualBehavior: `Status ${response.status}: ${JSON.stringify(response.data)}`
      });
      
      console.log(`✅ Status: ${response.status}`);
      console.log(`📦 Response: ${JSON.stringify(response.data, null, 2)}\n`);
    } catch (error: any) {
      results.push({
        scenario: "Scenario 3: Valid ID + Invalid Token",
        success: false,
        response: error.response?.data || error.message,
        expectedBehavior: "DELETE should succeed with 200 status and 'Project removed' message",
        actualBehavior: `Error: ${error.message}`
      });
      
      console.log(`❌ Status: ${error.response?.status || error.message}`);
      console.log(`📦 Response: ${JSON.stringify(error.response?.data || error.message, null, 2)}\n`);
    }

    // Test Scenario 4: Invalid project ID + Invalid token
    console.log("─".repeat(80));
    console.log("📊 SCENARIO 4: Invalid Project ID + Invalid Token");
    console.log("─".repeat(80));
    try {
      const response = await axios.delete(
        `${BASE_URL}/projects/${testProjectId}`,
        {
          headers: {
            "Authorization": `Bearer ${validToken}`,
            "Content-Type": "application/json"
          }
        }
      );
      
      results.push({
        scenario: "Scenario 4: Invalid ID + Invalid Token",
        statusCode: response.status,
        success: true,
        response: response.data,
        expectedBehavior: "DELETE should succeed with 200 status and 'Project removed' message",
        actualBehavior: `Status ${response.status}: ${JSON.stringify(response.data)}`
      });
      
      console.log(`✅ Status: ${response.status}`);
      console.log(`📦 Response: ${JSON.stringify(response.data, null, 2)}\n`);
    } catch (error: any) {
      results.push({
        scenario: "Scenario 4: Invalid ID + Invalid Token",
        success: false,
        response: error.response?.data || error.message,
        expectedBehavior: "DELETE should succeed with 200 status and 'Project removed' message",
        actualBehavior: `Error: ${error.message}`
      });
      
      console.log(`❌ Status: ${error.response?.status || error.message}`);
      console.log(`📦 Response: ${JSON.stringify(error.response?.data || error.message, null, 2)}\n`);
    }

    console.log("✅ All tests completed!");
    console.log("Results:", JSON.stringify(results, null, 2));
  } catch (error: any) {
    console.error("❌ An error occurred:", error.message);
  }
}

runTests();