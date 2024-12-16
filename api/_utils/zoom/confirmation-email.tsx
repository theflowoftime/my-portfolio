import {
  Button,
  Container,
  Html,
  Section,
  Text,
} from "@react-email/components";

// Define the email template
export default function EmailTemplate(props: {
  joinUrl: string;
  startTime: string;
  password: string;
  timeZone: string;
}) {
  return (
    <Html lang="en">
      <Container>
        <Section>
          <Text>Hi,</Text>
          <Text>Your meeting has been scheduled. Here are the details:</Text>
          <Text>
            <strong>Start Time:</strong> {props.startTime}
          </Text>
          <Text>
            <strong>Time Zone:</strong> {props.timeZone}
          </Text>
          <Text>
            <strong>Password:</strong> {props.password}
          </Text>
          <Button href={props.joinUrl} style={{ marginTop: "10px" }}>
            Join the Meeting
          </Button>
        </Section>
      </Container>
    </Html>
  );
}
