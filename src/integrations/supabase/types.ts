export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          created_at: string
          email: string
          full_name: string | null
          id: string
          searches_used: number | null
          subscription_status: string | null
          subscription_tier: string | null
          total_searches_allowed: number | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          full_name?: string | null
          id: string
          searches_used?: number | null
          subscription_status?: string | null
          subscription_tier?: string | null
          total_searches_allowed?: number | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          searches_used?: number | null
          subscription_status?: string | null
          subscription_tier?: string | null
          total_searches_allowed?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      saved_jobs: {
        Row: {
          company: string
          date_posted: string | null
          date_saved: string
          description: string | null
          id: string
          job_title: string
          job_type: string | null
          location: string | null
          notes: string | null
          remote: boolean | null
          url: string | null
          user_id: string
          visa_sponsored: boolean | null
        }
        Insert: {
          company: string
          date_posted?: string | null
          date_saved?: string
          description?: string | null
          id?: string
          job_title: string
          job_type?: string | null
          location?: string | null
          notes?: string | null
          remote?: boolean | null
          url?: string | null
          user_id: string
          visa_sponsored?: boolean | null
        }
        Update: {
          company?: string
          date_posted?: string | null
          date_saved?: string
          description?: string | null
          id?: string
          job_title?: string
          job_type?: string | null
          location?: string | null
          notes?: string | null
          remote?: boolean | null
          url?: string | null
          user_id?: string
          visa_sponsored?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "saved_jobs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      saved_searches: {
        Row: {
          created_at: string
          full_time: boolean | null
          id: string
          job_title: string | null
          job_urls: string[] | null
          last_run: string | null
          location: string | null
          name: string | null
          part_time: boolean | null
          remote: boolean | null
          user_id: string
          visa_only: boolean | null
        }
        Insert: {
          created_at?: string
          full_time?: boolean | null
          id?: string
          job_title?: string | null
          job_urls?: string[] | null
          last_run?: string | null
          location?: string | null
          name?: string | null
          part_time?: boolean | null
          remote?: boolean | null
          user_id: string
          visa_only?: boolean | null
        }
        Update: {
          created_at?: string
          full_time?: boolean | null
          id?: string
          job_title?: string | null
          job_urls?: string[] | null
          last_run?: string | null
          location?: string | null
          name?: string | null
          part_time?: boolean | null
          remote?: boolean | null
          user_id?: string
          visa_only?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "saved_searches_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      search_results: {
        Row: {
          company: string
          date_found: string
          date_posted: string | null
          description: string | null
          id: string
          job_title: string
          job_type: string | null
          location: string | null
          remote: boolean | null
          search_id: string | null
          url: string | null
          user_id: string
          visa_sponsored: boolean | null
        }
        Insert: {
          company: string
          date_found?: string
          date_posted?: string | null
          description?: string | null
          id?: string
          job_title: string
          job_type?: string | null
          location?: string | null
          remote?: boolean | null
          search_id?: string | null
          url?: string | null
          user_id: string
          visa_sponsored?: boolean | null
        }
        Update: {
          company?: string
          date_found?: string
          date_posted?: string | null
          description?: string | null
          id?: string
          job_title?: string
          job_type?: string | null
          location?: string | null
          remote?: boolean | null
          search_id?: string | null
          url?: string | null
          user_id?: string
          visa_sponsored?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "search_results_search_id_fkey"
            columns: ["search_id"]
            isOneToOne: false
            referencedRelation: "saved_searches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "search_results_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      subscription_plans: {
        Row: {
          features: Json
          id: number
          name: string
          price_monthly: number
          price_yearly: number
          searches_per_month: number
          stripe_price_id_monthly: string | null
          stripe_price_id_yearly: string | null
        }
        Insert: {
          features: Json
          id?: number
          name: string
          price_monthly: number
          price_yearly: number
          searches_per_month: number
          stripe_price_id_monthly?: string | null
          stripe_price_id_yearly?: string | null
        }
        Update: {
          features?: Json
          id?: number
          name?: string
          price_monthly?: number
          price_yearly?: number
          searches_per_month?: number
          stripe_price_id_monthly?: string | null
          stripe_price_id_yearly?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
